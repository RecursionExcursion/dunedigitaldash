import { ComponentPropsWithRef } from "react";

export function Input(
  props: { label: string } & ComponentPropsWithRef<"input">
) {
  const { label, ...rest } = props;

  return (
    <label htmlFor={label}>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </span>

      <input
        type="text"
        id={label}
        className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        {...rest}
      />
    </label>
  );
}
