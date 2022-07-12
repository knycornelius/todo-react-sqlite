import React from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from "react-native";

import { Header, TasksList, TodoInput } from "./components";
import { COLORS } from "./constants";
import { useTask } from "./hooks";

export default function App() {
  const {
    data: tasks,
    handleAddTask,
    handleRemoveTask,
    handleToggleTaskDone,
    handleUpdateTaskName,
  } = useTask();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.innerContainer}>
        <Header tasksCount={tasks.length} />
        <TodoInput addTask={handleAddTask} />
        <TasksList
          tasks={tasks}
          toggleTaskDone={handleToggleTaskDone}
          removeTask={handleRemoveTask}
          updateTaskName={handleUpdateTaskName}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  innerContainer: {
    flex: 3,
    paddingHorizontal: 24,
  },
});
