import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  // console.log(location.pathname);
  return (
    <div className="w-full bg-blue-800 text-white flex justify-between p-2 items-center">
      <img src="/vite.svg" alt="Logo" className="" />
      <ul className="flex justify-between gap-4">
        <li
          className={location.pathname === "/" ? "underline font-semibold" : ""}
        >
          <a href="/">Entity List</a>
        </li>
        <li
          className={
            location.pathname === "/add-entity" ? "underline font-semibold" : ""
          }
        >
          <a href="/add-entity">Add Entity</a>
        </li>
        <li
          className={
            location.pathname === "/add-entry" ? "underline font-semibold" : ""
          }
        >
          <a href="/add-entry">Add Entry</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
