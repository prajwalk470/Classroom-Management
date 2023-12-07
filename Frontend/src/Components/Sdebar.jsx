// Sidebar.js
import { Link } from "react-router-dom";
import { React, useState } from "react";

const Sidebar = ({ fixed }) => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Home", src: "Chart_fill", path: "/home" },
    { title: "Users", src: "User", gap: true },
    { title: "TimeTable ", src: "Calendar", path: "/ttshow" },
    { title: "Admin Login", src: "Setting", path: "/login" },
  ];

  return (
    <div className={`flex ${fixed ? "fixed inset-y-0 left-0" : ""}`}>
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-black h-screen p-5 pt-8 relative duration-300`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[200deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            User Menu
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <Link to={Menu.path}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={`./src/assets/${Menu.src}.png`} />
                  <span
                    className={`${!open && "hidden"} origin-left duration-200 font-medium text-lg ml-6`}
                  >
                    {Menu.title}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
