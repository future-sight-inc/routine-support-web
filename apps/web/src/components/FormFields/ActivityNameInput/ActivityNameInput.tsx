import React from "react";

import { ActivityNameInput as UncontrolledActivityNameInput } from "../../ActivityNameInput";
import { Controller } from "../Controller";
import { FormFieldProps } from "../types";

export const ActivityNameInput: React.FC<FormFieldProps> = ({
  name,
  control,
  required,
  disabled,
  placeholder,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      required={required}
      disabled={disabled}
      // eslint-disable-next-line unused-imports/no-unused-vars
      render={({ field: { ref, ...fieldProps } }) => (
        <UncontrolledActivityNameInput {...fieldProps} placeholder={placeholder} />
      )}
    />
  );
};
