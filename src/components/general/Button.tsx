"use client";

import { ComponentPropsWithoutRef } from "react";

export default function Button(props: ComponentPropsWithoutRef<"button">) {
  return (
    // <button className="cursor-pointer group flex items-center justify-between gap-4 rounded-lg border border-indigo-600 bg-indigo-600 px-5 py-3 transition-colors hover:bg-transparent focus:ring-2 focus:outline-hidden" {...props}>
    //   <span className="font-medium text-white transition-colors group-hover:text-indigo-600">
    //     {props.children}
    //   </span>

    //   <span className="shrink-0 rounded-full border border-current bg-white p-2 text-indigo-600">
    //     <svg className="size-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
    //     </svg>
    //   </span>
    // </button>
    <button className="text-black group inline-block rounded-sm bg-linear-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5 hover:text-white" {...props}>
      <span className="block rounded-xs bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
       {props.children}
      </span>
    </button>
  )
}
