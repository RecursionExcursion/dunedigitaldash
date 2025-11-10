"use client";

import { ComponentPropsWithoutRef } from "react";

export default function Button(props: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className="relative overflow-hidden bg-gray-800 text-white px-6 py-3 rounded-lg group btn btn-task"
      {...props}
    >
      <span className="relative z-10">{props.children}</span>
      <span className="absolute -inset-1 bg-gradient-to-tr from-transparent via-white/70 to-transparent rotate-45 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out"></span>
    </button>
  );
}
