import Image from "next/image";
import React from "react";

function SolutionCard({
  category,
  subCategory,
  createdAt,
  title,
  description,
  slug,
  className,
  type = "posts",
}) {
  return (
    <div>
      <div className="relative w-full aspect-video">
        <Image
          className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
          src={`http://localhost:8081/api/${type}/image/${slug}`}
          alt={title}
          fill
          sizes="(max-width: 500px) 100%"
          // className="object-cover group-hover:scale-[1.02] transition-all"
        />
      </div>

      <div className="mt-8">
        <span className="text-blue-500 uppercase">{category}</span>
        <span className="text-blue-500 uppercase">{subCategory}</span>

        <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">{description}</p>

        <div className="flex items-center justify-between mt-4">
          <div>
            <a
              href="#"
              className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-500"
            >
              John snow
            </a>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {createdAt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SolutionCard;
