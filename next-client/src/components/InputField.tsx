import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  PinInputFieldProps,
} from "@chakra-ui/react";
import { useField } from "formik";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

const inputField: React.FC<Props> = ({ label, size: _, ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error} isRequired>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        {...field}
        {...props} // label, placeholders are also in props
        id={field.name}
      />
      {error ? <FormErrorMessage>{}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default inputField;
