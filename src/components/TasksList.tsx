import React from "react";
import { FlatList } from "react-native";

import { Task } from "../types";

import { TaskItem } from "./TaskItem";

type Props = {
  tasks: Array<Task>;
  removeTask: (id: number) => void;
  toggleTaskDone: (id: number, done: boolean) => void;
  updateTaskName: (id: number, name: string) => void;
};

export function TasksList(props: Props) {
  const { tasks, removeTask, toggleTaskDone, updateTaskName } = props;

  return (
    <FlatList
      data={tasks}
      keyExtractor={(task) => String(task.id)}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return (
          <TaskItem
            task={item}
            toggleTaskDone={toggleTaskDone}
            removeTask={removeTask}
            updateTaskName={updateTaskName}
          />
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}
