import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { COLORS } from "../constants";

type Props = {
  tasksCount: number;
};

export function Header(props: Props) {
  const { tasksCount } = props;

  const tasksCountLabel = tasksCount === 1 ? `task` : `tasks`;

  return (
    <View style={styles.container}>
      <View style={styles.tasks}>
        <Text style={styles.tasksCounter}>Remaining Tasks: </Text>
        <Text style={{ ...styles.tasksCounter, fontWeight: "700" }}>
          {tasksCount} {tasksCountLabel}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  tasks: {
    alignItems: "center",
    flexDirection: "row",
  },
  tasksCounter: {
    fontSize: 20,
    color: COLORS.white,
  },
});
