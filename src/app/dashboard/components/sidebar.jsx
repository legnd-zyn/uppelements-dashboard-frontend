"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { MdPostAdd } from "react-icons/md";
import { SiBandrautomation } from "react-icons/si";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  ProSidebarProvider,
  SubMenu,
} from "react-pro-sidebar";

import Logo from "../../images/uppelementslogo.png";
import { IconContext } from "react-icons";
import { IoStatsChart } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { TbTools, TbTopologyStar3 } from "react-icons/tb";
import { RiRecycleLine } from "react-icons/ri";
import { BiMessageSquareDots } from "react-icons/bi";
import { FcMenu } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useScreen from "@/hooks/useScreen";
import { useRole } from "@/app/Context/ContextProvider";

export default function Sidebar() {
  return (
    <ProSidebarProvider>
      <div className="h-screen relative bg-white">
        <SideBarComponent />
      </div>
    </ProSidebarProvider>
  );
}

function SideBarComponent() {
  const { collapseSidebar, collapsed } = useProSidebar();
  const Router = useRouter();
  const screen = useScreen();

  const { role } = useRole();

  useEffect(() => {
    if (screen.width < 768 && collapsed !== true) {
      collapseSidebar();
    }

    Router.prefetch("/dashboard/posts/new-post");
  }, []);

  useEffect(() => {
    window.addEventListener("load", handlePrefetchRoutes);

    return () => {
      window.removeEventListener("load", handlePrefetchRoutes);
    };
  }, []);
  const handlePrefetchRoutes = () => {
    Router.prefetch("/dashboard/posts/new-post");
    Router.prefetch("/dashboard/posts/my-posts");
    Router.prefetch("/dashboard/utils");
    Router.prefetch("/dashboard/tools/add-new-tool");
    Router.prefetch("/dashboard/tools/my-tools");
  };

  return (
    <>
      <div className="fixed top-10 right-10 z-50">
        <button
          onClick={() => {
            collapseSidebar();
          }}
          className="p-2 flex justify-center items-center md:text-gray-200 md:hidden "
        >
          <FcMenu />
        </button>
      </div>
      <Sidebar className="h-full relative max-w-[250px] bg-white">
        <Link href={"/"}>
          <div className="relative w-full overflow-hidden">
            <Image src={Logo} className="max-w-[150px] m-5" alt="logo" />
          </div>
        </Link>
        {!role || role === "guest" ? (
          <div className="absolute inset-0 bg-white flex justify-center items-center">
            <span className="loader"></span>
          </div>
        ) : (
          <IconContext.Provider value={{ size: "1.2rem" }}>
            <Menu className="text-xs font-bold text-gray-500">
              {/* <MenuItem icon={<IoStatsChart />}> Stats </MenuItem> */}
              <MenuItem
                icon={<TbTools />}
                onClick={() => Router.push("/dashboard/utils")}
              >
                Utils
              </MenuItem>
              <SubMenu icon={<MdPostAdd />} label="Posts">
                <MenuItem
                  onClick={() => Router.push("/dashboard/posts/new-post")}
                >
                  New Post
                </MenuItem>
                <MenuItem
                  onClick={() => Router.push("/dashboard/posts/my-posts")}
                >
                  My Posts
                </MenuItem>
              </SubMenu>
              <SubMenu icon={<SiBandrautomation />} label={"AI Tools"}>
                <MenuItem
                  onClick={() => Router.push("/dashboard/tools/add-new-tool")}
                >
                  Add Tools
                </MenuItem>
                <MenuItem
                  onClick={() => Router.push("/dashboard/tools/my-tools")}
                >
                  My Tools
                </MenuItem>
              </SubMenu>
              <SubMenu icon={<TbTopologyStar3 />} label="IT-Solutions">
                <MenuItem
                  onClick={() =>
                    Router.push("/dashboard/it-solutions/add-solution")
                  }
                >
                  Add New Solution
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    Router.push("/dashboard/it-solutions/my-solutions")
                  }
                >
                  {" "}
                  My Solutions
                </MenuItem>
              </SubMenu>
              {/* <MenuItem icon={<RiRecycleLine />}> Recycled</MenuItem> */}
              {/* <MenuItem icon={<FaUsers />}> Users</MenuItem> */}
              <MenuItem icon={<BiMessageSquareDots />}> Feedbacks</MenuItem>
            </Menu>
          </IconContext.Provider>
        )}
      </Sidebar>
    </>
  );
}
