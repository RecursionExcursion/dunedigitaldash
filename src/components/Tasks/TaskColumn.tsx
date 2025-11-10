"use client";

import { TaskrTask } from "../../lib/taskr-types";
import { TaskCard } from "./TaskCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";

type TaskColumnProps = {
  columneTitle: string;
  tasks: TaskrTask[];
  updateTaskStatus: (id: string, status: number) => void;
  colStatus: number;
};

export function TaskColumn(props: TaskColumnProps) {
  const { columneTitle, tasks, colStatus, updateTaskStatus } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      className="
        flex flex-col md:flex-col
        flex-1 w-full md:min-h-full
        gap-5 px-4 md:p-8
        rounded text-3xl text-white font-bold relative
      "
    >
      <h2
        className="
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          md:relative md:left-0 md:top-0 md:transform-none
          text-center text-5xl
        "
      >
        {columneTitle}
      </h2>

      <div className="text-center text-base md:text-lg mt-2">
        {tasks.length > 0 ? `${activeIndex + 1} / ${tasks.length}` : "0 / 0"}
      </div>

      {/* Allow overflow so the neighboring slides are visible */}
      <div className="w-full overflow-visible">
        <Swiper
          key={`swiper-${colStatus}`}
          slidesPerView="auto"
          centeredSlides
          centeredSlidesBounds
          spaceBetween={24}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          observer
          observeParents
          roundLengths
          className="mySwiper"
        >
          {tasks.map((t) => (
            <SwiperSlide
              key={t.id}
              // Width <100% so you can see a bit of the previous/next slide.
              // Tweak these percentages to taste.
              className="!w-auto max-w-[85%] md:max-w-[70%] !flex !justify-center"
            >
              <div className="w-full">
                <TaskCard
                  colStatus={colStatus}
                  t={t}
                  updateTaskStatus={updateTaskStatus}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
