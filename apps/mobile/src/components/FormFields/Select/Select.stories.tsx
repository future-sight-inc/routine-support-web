import React from "react";

import { storiesOf } from "@storybook/react-native";
import { useForm } from "react-hook-form";

import { Select } from "./Select";

const Wrapper: React.FC = () => {
  const { control } = useForm();

  return (
    <Select
      name="option"
      label="Option"
      control={control}
      options={[
        { text: "Option 1", value: "1" },
        { text: "Option 2", value: "2" },
      ]}
    />
  );
};

storiesOf("Components/FormFields", module).add("Select", () => {
  return <Wrapper />;
});