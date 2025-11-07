"use client";

import { ComponentPropsWithoutRef } from "react";

export default function Button(props: ComponentPropsWithoutRef<"button">) {
  return (
    <button className="text-black group inline-block rounded-sm bg-linear-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5 hover:text-white" {...props}>
      <span className="block rounded-xs bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
        {props.children}
      </span>
    </button>
  )
}
