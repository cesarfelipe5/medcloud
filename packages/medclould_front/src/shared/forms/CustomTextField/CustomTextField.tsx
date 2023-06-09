import { TextField, useTheme } from "@mui/material";
import { useField } from "@unform/core";
import { FC, useEffect, useState } from "react";
import { TCustomTextField } from "./CustomTextField.types";

export const CustomTextField: FC<TCustomTextField> = ({ name, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);

  const theme = useTheme();

  const [value, setValue] = useState(defaultValue || "");

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  return (
    <TextField
      {...rest}
      error={!!error}
      size="small"
      helperText={error}
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={() => error && clearError()}
    />
  );
};
