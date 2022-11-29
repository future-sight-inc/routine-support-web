import React from "react";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Student as StudentType } from "@routine-support/domains";
import { getColor } from "@routine-support/ui-theme";
import { IconButton } from "apps/mobile/src/components/IconButton";
import { Typography } from "apps/mobile/src/components/Typography";
import { Theme } from "apps/mobile/src/theme";
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { QrCode } from "../QrCode";
import { StudentLocators } from "./locators";

interface StudentProps {
  student: StudentType;
  onStudentOpen: () => void;
  onSettingsOpen: () => void;
  onStudentDelete: () => void;
}

export const Student: React.FC<StudentProps> = ({
  student,
  onStudentOpen,
  onSettingsOpen,
  onStudentDelete,
}) => {
  const renderRightActions = () => (
    <TouchableOpacity
      style={styles.deleteWrapper}
      testID={StudentLocators.DeleteButton}
      onPress={onStudentDelete}
    >
      <MaterialIcons name="delete" size={30} style={styles.deleteIcon} />
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableWithoutFeedback onPress={onStudentOpen}>
        <View style={styles.wrapper}>
          <MaterialIcons
            name="face"
            size={66}
            style={styles.avatar}
            color={getColor(student.color)}
          />
          <Typography variant="caption4Normal">{student.name}</Typography>
          <View style={styles.buttonsBlock}>
            <IconButton
              icon="settings"
              style={styles.settingsButton}
              onPress={onSettingsOpen}
              testID={StudentLocators.SettingsButton}
            />
            <QrCode student={student} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    backgroundColor: Theme.palette.common.white,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  avatar: {
    height: 66,
    width: 66,
    marginRight: 16,
  },
  buttonsBlock: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
  },
  settingsButton: {
    marginRight: 8,
  },
  deleteWrapper: {
    width: 80,
    height: 80,
    backgroundColor: Theme.palette.common.red,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    color: Theme.palette.common.white,
  },
});