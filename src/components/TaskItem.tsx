import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";

import { COLORS } from "../constants";
import { Task } from "../types";

type Props = {
  task: Task;
  removeTask: (id: number) => void;
  toggleTaskDone: (id: number, done: boolean) => void;
  updateTaskName: (id: number, name: string) => void;
};

export function TaskItem(props: Props) {
  const { task, toggleTaskDone, removeTask, updateTaskName } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskText, setEditingTaskText] = useState(task.name ?? "");
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleSubmitEditing() {
    updateTaskName(task.id, editingTaskText);
    setIsEditing(false);
  }

  function handleRemoveTask(id: number) {
    if (!isEditing) {
      Alert.alert("Remove Task", "Are you sure to remove this task?", [
        {
          text: "Yes",
          onPress: () => removeTask(id),
        },
        { text: "No" },
      ]);
    }
  }

  useEffect(() => {
    if (isEditing) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, [isEditing]);

  return (
    <View
      style={{
        ...styles.container,
        borderLeftColor: task.done ? COLORS.green : COLORS.red,
      }}
    >
      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => toggleTaskDone(task.id, !task.done)}
      >
        <TextInput
          ref={textInputRef}
          style={{
            ...styles.taskText,
            textDecorationLine: task.done ? "line-through" : "none",
          }}
          numberOfLines={1}
          editable={isEditing}
          onChangeText={setEditingTaskText}
          value={editingTaskText}
          onSubmitEditing={handleSubmitEditing}
          autoCorrect={false}
        />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ ...styles.button, ...styles.leftButton }}
          onPress={!isEditing ? handleStartEditing : handleSubmitEditing}
        >
          <Icon
            type="ionicon"
            name="pencil-outline"
            size={20}
            tvParallaxProperties={undefined}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ ...styles.button, ...styles.rightButton }}
          onPress={() => handleRemoveTask(task.id)}
        >
          <Icon
            type="ionicon"
            name="trash-outline"
            size={20}
            tvParallaxProperties={undefined}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderLeftWidth: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  button: {
    height: 46,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  leftButton: {
    backgroundColor: COLORS.green,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rightButton: {
    backgroundColor: COLORS.red,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    padding: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  taskButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  taskText: {
    color: COLORS.black,
    fontSize: 16,
  },
});
