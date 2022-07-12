import { useEffect, useState } from "react";
import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";

import { Task } from "../types";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("tasks.db");
  return db;
}

const db = openDatabase();

export function useTask() {
  const [data, setData] = useState<Array<Task>>([]);

  const tableInit = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, done BOOLEAN NOT NULL);",
      );
    });
  };

  const fetchData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM tasks;`,
        undefined,
        (_, { rows: { _array } }) => setData(_array),
      );
    });
  };

  useEffect(() => {
    tableInit();
    fetchData();
  }, []);

  const handleAddTask = (name: string) => {
    if (name === null || name === "") {
      return;
    }

    db.transaction(
      (tx) => {
        tx.executeSql("INSERT INTO tasks (name, done) VALUES (?, false)", [
          name,
        ]);
      },
      undefined,
      fetchData,
    );
  };

  const handleToggleTaskDone = (id: number, done: boolean) => {
    const newDone = +done; // Convert to number (0 = false, 1 = true)
    db.transaction(
      (tx) => {
        tx.executeSql(`UPDATE tasks SET done = ? WHERE id = ?;`, [newDone, id]);
      },
      undefined,
      fetchData,
    );
  };

  const handleUpdateTaskName = (id: number, name: string) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`UPDATE tasks SET name = ? WHERE id = ?;`, [name, id]);
      },
      undefined,
      fetchData,
    );
  };

  const handleRemoveTask = (id: number) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`DELETE FROM tasks WHERE id = ?;`, [id]);
      },
      undefined,
      fetchData,
    );
  };

  return {
    data,
    handleAddTask,
    handleRemoveTask,
    handleToggleTaskDone,
    handleUpdateTaskName,
  };
}
