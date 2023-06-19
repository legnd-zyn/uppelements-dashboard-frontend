"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "../../images/uppelementslogo.png";

import { IconContext } from "react-icons";
import { MdPostAdd } from "react-icons/md";
import { SiBandrautomation } from "react-icons/si";
import { IoStatsChart } from "react-icons/io5";
import { FaUser, FaUsers } from "react-icons/fa";
import { TbTools, TbTopologyStar3 } from "react-icons/tb";
import { RiRecycleLine } from "react-icons/ri";
import { BiChevronDown, BiMessageSquareDots } from "react-icons/bi";
import { FcMenu } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";

import useScreen from "@/hooks/useScreen";
import { useRole } from "@/app/Context/ContextProvider";

export default function SideBar() {
  const [isCollepsed, setIsCollepsed] = useState(false);
  const screen = useScreen();

  const { role } = useRole();

  const handleClickEvent = (e) => {
    if (e.target.classList.contains("sidebar")) {
      setIsCollepsed(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      if (window.innerWidth > 1024) {
        setIsCollepsed(false);
      } else {
        setIsCollepsed(true);
      }
    });
  }, []);

  return (
    <div>
      <button
        className="fixed z-50 right-10 top-10 p-2 rounded-full bg-slate-200 lg:hidden"
        onClick={() => {
          setIsCollepsed((prev) => !prev);
        }}
      >
        <FcMenu />
      </button>
      <div
        className={`sidebar w-full h-screen transition-all absolute z-20 bg-gray-600/50 lg:relative lg:w-max ${
          isCollepsed ? "-translate-x-full" : "translate-x-0"
        }`}
        onClick={handleClickEvent}
      >
        <div className={`w-60 bg-white h-full left-0 relative p-2 pl-5 pt-10 `}>
          <div className="max-w-[200px] relative mx-auto">
            <Image src={Logo} alt="logo" />
          </div>
          <div>
            <IconContext.Provider value={{ size: "1.2rem" }}>
              <ul className="w-full mt-10 select-none">
                {[
                  { title: "Utils", href: "/dashboard/utils", Icon: TbTools },
                  {
                    title: "Posts",
                    dropdown: true,
                    Icon: MdPostAdd,
                    list: [
                      { title: "MyPosts", href: "/dashboard/posts/my-posts" },
                      {
                        title: "CreatePost",
                        href: "/dashboard/posts/new-post",
                      },
                    ],
                  },
                  {
                    title: "IT-Solutions",
                    Icon: TbTopologyStar3,
                    dropdown: true,
                    list: [
                      {
                        title: "My Solutions",
                        href: "/dashboard/it-solutions/my-solutions",
                      },
                      {
                        title: "Add Solution",
                        href: "/dashboard/it-solutions/add-solution",
                      },
                    ],
                  },
                  {
                    title: "Tools",
                    dropdown: true,
                    Icon: TbTools,
                    list: [
                      {
                        title: "My Tools",
                        href: "/dashboard/tools/my-tools",
                      },
                      {
                        title: "Add Tool",
                        href: "/dashboard/tools/add-tool",
                      },
                    ],
                  },
                  {
                    title: "Users",
                    href: "/users",
                    Icon: FaUser,
                  },
                  {
                    title: "Recycle Bin",
                    href: "/recycled",
                    Icon: RiRecycleLine,
                  },
                ].map((props, ind) => (
                  <ListItem key={ind} {...props} />
                ))}
              </ul>
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListItem({ dropdown, title, list, href, Icon }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return dropdown ? (
    <div>
      <li
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full flex justify-between font-semibold items-center text-sm text-gray-800 hover:bg-slate-200 rounded-md p-4"
      >
        <span className=" flex gap-3 items-center">
          {Icon && <Icon />} {title}
        </span>
        <span className={isExpanded ? "0" : "-rotate-90"}>
          <BiChevronDown />
        </span>
      </li>
      {isExpanded && (
        <ul className="pl-3 border-b">
          {list.map((props, ind) => (
            <ListItem key={ind} {...props} />
          ))}
        </ul>
      )}
    </div>
  ) : (
    <Link href={href}>
      <li className="w-full flex justify-between font-semibold items-center text-sm text-gray-800 hover:bg-slate-200 rounded-md p-4">
        <span className=" flex gap-3 items-center">
          {Icon && <Icon />} {title}
        </span>
      </li>
    </Link>
  );
}
