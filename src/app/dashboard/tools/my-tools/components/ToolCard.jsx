import React from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import DeleteBtn from "@/app/dashboard/components/Atoms/DeleteBtn";

function ToolCard({
  type = "ai-tools",
  _id: id,
  name,
  description,
  link,
  keywords,
  className
}) {
  return (
    <div
      className={`rounded-lg group overflow-hidden shadow transition hover:shadow-lg relative ${
        className || ""
      } max-w-md p-3 h-max bg-base-200`}
    >
      <div className="absolute w-full h-4/6 left-0 -bottom-full rounded-lg group-hover:bottom-0 transition-all text-center bg-white/90 z-20  flex justify-center items-center">
        <div className="flex gap-5 flex-col">
          <DeleteBtn />
        </div>
      </div>
      <div className="relative aspect-video overflow-hidden rounded-md">
        <Image
          alt={name}
          src={`http://localhost:8081/api/${type}/image/${id}`}
          fill
          sizes="(max-width: 500px) 100%"
          className="object-cover group-hover:scale-[1.02] transition-all"
        />
      </div>

      <div className=" p-2 sm:p-3">
        {/* <div className="flex justify-between items-center">
          <div className="flex gap-0.5 items-center text-gray-500 text-xs">
            <span className="cursor-default">{category}</span>
            &gt;
            <span className="cursor-default">{subCategory}</span>
          </div>
          <time
            dateTime="2022-10-10"
            className="block text-xs text-gray-500 cursor-pointer"
          >
            {format(createdAt)}
          </time>
        </div> */}

        <div className="flex justify-between items-center mt-2">
          <h3 className="text-lg line-clamp-1 text-left  text-neutral hover:text-neutral-focus ">
            {name}
          </h3>
          <span className="p-2 self-start">
            <FiArrowUpRight />
          </span>
        </div>

        <p className="mt-1 text-xs leading-relaxed text-left text-neutral/70 hover:text-neutral line-clamp-2 cursor-pointer">
          {description}
        </p>
      </div>
    </div>
  );
}

export default ToolCard;
