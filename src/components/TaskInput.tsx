import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";

import { COLORS } from "../constants";

type Props = {
  addTask: (name: string) => void;
};

export function TodoInput(props: Props) {
  const { addTask } = props;

  const [name, setName] = useState("");

  function handleAddNewTask() {
    if (name) {
      addTask(name);
      setName("");
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add new task"
        placeholderTextColor="#B2B2B2"
        returnKeyType="send"
        selectionColor="#666666"
        value={name}
        onChangeText={setName}
        onSubmitEditing={handleAddNewTask}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.addButton}
        onPress={handleAddNewTask}
      >
        <Icon
          type="ionicon"
          name="add-outline"
          size={20}
          tvParallaxProperties={undefined}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginTop: -28,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 46,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRightWidth: 1,
    borderRightColor: COLORS.white,
    color: COLORS.black,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: COLORS.green,
    height: 46,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});
