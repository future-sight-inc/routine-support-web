import React from "react";

import { FormFieldProps } from "@routine-support/forms";

import { LanguageSelector as UncontrolledLanguageSelector } from "../../LanguageSelector";
import { Controller } from "../Controller";

export const LanguageSelector: React.FC<FormFieldProps> = ({
  name,
  label,
  control,
  required,
  disabled,
  helperText,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      label={label}
      required={required}
      disabled={disabled}
      helperText={helperText}
      // eslint-disable-next-line unused-imports/no-unused-vars
      render={({ field: { ref, ...fieldProps } }) => (
        <UncontrolledLanguageSelector
          {...props}
          {...fieldProps}
          onSelect={(value) => fieldProps.onChange(value)}
        />
      )}
    />
  );
};