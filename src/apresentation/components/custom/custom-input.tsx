import {
  UseFormRegister,
  FieldValues,
  DeepMap,
  FieldError,
  Path,
} from "react-hook-form";
import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { Input } from "@/apresentation/components/ui/input.tsx";

interface CustomInputProps<TFieldValues extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
}

export function CustomInput<TFieldValues extends FieldValues>({
  type,
  placeholder,
  name,
  register,
  errors,
  ...rest
}: CustomInputProps<TFieldValues>) {
  return (
    <>
      <Input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`${errors[name]?.message ? "border-red-400" : ""}`}
        {...rest}
      />
      {/*<span className='text-xs text-red-600'>{errors[name]?.message && <p>{errors[name]?.message}</p>}</span>*/}
    </>
  );
}
