import { ComponentPropsWithRef } from "react";

export function Input(
  props: { label: string } & ComponentPropsWithRef<"input">
) {
  const { label, ...rest } = props;

  return (
    <label htmlFor={label} className="flex flex-col ">
      <span className="text-primary-900 font-bold text-shadow-md ">
        {label}
      </span>

      <input
        type="text"
        id={label}
        className="bg-task-400 text-white border border-white rounded text-lg/9 shadow-md"
        {...rest}
      />
    </label>
  );
}
