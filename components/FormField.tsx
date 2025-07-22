import React from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input, Textarea } from "./ui/input";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string | "";
  placeholder?: string;
  type?: "text" | "email" | "password" | "file";
  as?: "input" | "textarea";
  className?: string;
  disabled?: boolean;
}

const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  as = "input",
  className = "input",
  disabled = false,
  ...props
}: FormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="label"> {label}</FormLabel>
          <FormControl>
            {as === "textarea" ? (
              <Textarea
                className="min-h-[100px]"
                placeholder="Enter your job description"
                disabled={disabled}
                {...field}
                {...props}
              />
            ) : (
              <Input
                className={className}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
                {...props}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormField;
