import React from "react";

import { Activity as ActivityType } from "@routine-support/domains";
import { stringifyTime } from "@routine-support/utils";
import { Button, Layout, Text } from "@ui-kitten/components";
import { Image } from "react-native";

interface CurrentActivityProps {
  activity: ActivityType;
}

export const CurrentActivity: React.FC<CurrentActivityProps> = ({
  activity,
}) => {
  return (
    <Layout
      style={{
        padding: 16,
        flex: 1,
        flexDirection: "row",
      }}
    >
      <Image
        source={{
          uri: activity.pictogram,
        }}
        style={{ width: "50%", height: 200 }}
      />
      <Layout style={{ marginLeft: 16, width: "50%", paddingRight: 16 }}>
        <Text category="h5" style={{ marginBottom: 8, textAlign: "center" }}>
          {activity.name}
        </Text>
        <Text
          category="s1"
          appearance="hint"
          style={{ textAlign: "center", fontSize: 18 }}
        >
          {stringifyTime(activity.start)}-{stringifyTime(activity.end)}
        </Text>
        <Button style={{ marginTop: "auto" }}>Confirm</Button>
      </Layout>
    </Layout>
  );
};