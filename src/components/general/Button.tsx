"use client";

import { ComponentPropsWithoutRef } from "react";

export default function Button(props: ComponentPropsWithoutRef<"button">) {
  return <button {...props}></button>;
}
