import { ComponentPropsWithRef } from "react";

type InputProps = { label: string; tag: "input" } & ComponentPropsWithRef<"input">;
type TextareaProps = { label: string; tag: "textarea" } & ComponentPropsWithRef<"textarea">;
type Props = InputProps | TextareaProps;

export function Input(props: Props) {
  if (props.tag === "input") {
    const { label, tag, ...rest } = props;
    return (
      <label htmlFor={label} className="flex flex-col">
        <span className="text-white font-bold text-shadow-md">{label}</span>
        <input
          id={label}
          className="bg-task-600 text-white border border-task-accent-900 rounded text-lg/9 shadow-md p-2"
          {...rest}
        />
      </label>
    );
  }

  const { label, tag, ...rest } = props;
  return (
    <label htmlFor={label} className="flex flex-col">
      <span className="text-white font-bold text-shadow-md">{label}</span>
      <textarea
        id={label}
        className="bg-task-600 text-white border border-task-accent-900 rounded text-lg/9 shadow-md p-2"
        {...rest}
      />
    </label>
  );
}

