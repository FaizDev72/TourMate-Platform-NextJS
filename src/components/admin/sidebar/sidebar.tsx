"use client";
import { Image } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaBookOpen, FaHome, FaHotel } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineDataUsage } from "react-icons/md";
import { Dancing_Script } from "next/font/google";
import { GiHamburgerMenu } from "react-icons/gi";

import {
  Menu,
  MenuItem,
  Sidebar as ReactProSidebar,
  sidebarClasses,
} from "react-pro-sidebar";

const DancingScript = Dancing_Script({
  weight: "700",
  style: "normal",
  subsets: ["latin"],
});
const Sidebar = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState("/admin/dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSelectedItem(pathname);
  }, [pathname]);

  //   function handleItemClick(link: string) {
  //     setSelectedItem(link);
  //     router.push(link)
  //   }

  const menuItems = [
    { label: "Dashboard", icon: <FaHome />, link: "/admin/dashboard" },
    {
      label: "Trips",
      icon: <BiSolidCategory />,
      link: "/admin/trips",
    },
    {
      label: "Hotels",
      icon: <FaHotel />,
      link: "/admin/hotels",
    },
    { label: "Bookings", icon: <FaBookOpen />, link: "/admin/bookings" },
    {
      label: "Scrape Data",
      icon: <MdOutlineDataUsage />,
      link: "/admin/scrape-data",
    },
  ];

  return (
    <div className="h-[100vh] max-h-[100vh]  bg-slate-400 overflow-hidden sticky left-0 top-0">
      <ReactProSidebar
        collapsed={collapsed}
        className="h-full overflow-hidden"
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "#ffffff",
            "&:hover": {
              backgroundColor: "#ffffff",
            },
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active }) => {
              const backgroundColor = level === 0 ? "#ffffff" : "#ffffff";

              return {
                backgroundColor: active ? "#0E1428" : backgroundColor,
                color: active ? "#ffffff" : "00000",
                "&:hover": {
                  backgroundColor: active ? "#0E1418" : "#0E1428",
                  color: active ? "#ffffff" : "#ffffff",
                },
              };
            },
          }}
        >
          <button
            className="text-3xl text-right w-full p-2 flex justify-end cursor-pointer"
            onClick={() => setCollapsed(!collapsed)}
          >
            <GiHamburgerMenu />
          </button>
          <div className="flex flex-col my-10 items-center justify-center gap-3">
            <Image
              src="https://placehold.co/150x150"
              alt="dashboard"
              height={150}
              width={150}
              className="cursor-pointer"
              onClick={() => router.push("/admin/dasboard")}
            />
            <span className="text-4xl mt-2">
              <h1 className={DancingScript.className}>TourMate</h1>
            </span>
          </div>
          {menuItems.map((item, key) => (
            <React.Fragment key={key}>
              <MenuItem
                onClick={() => router.push(item?.link)}
                icon={item.icon}
                active={selectedItem === item.link}
              >
                {item.label}
              </MenuItem>
            </React.Fragment>
          ))}
          <MenuItem
            onClick={() => router.push("/admin/logout")}
            icon={<LuLogOut />}
            active={selectedItem === "/admin/logout"}
          >
            Logout
          </MenuItem>
        </Menu>
      </ReactProSidebar>
    </div>
  );
};

export default Sidebar;
