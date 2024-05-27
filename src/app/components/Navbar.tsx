"use client";

import { FC } from "react";

// components
import DeletePage from "./DeletePage";

interface HeaderProps {
  title: string;
}

const Navbar: FC<HeaderProps> = ({ title }) => {
  return (
    <>
      <div className="navbar bg-primary text-base-100 z-[100] fixed top-0 lg:hidden">
        <div className="flex-none ">
          <label
            htmlFor="my-drawer-3"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <i className="fa-solid fa-bars fa-xl"></i>
          </label>
        </div>
        <div className="flex-1 px-2 mx-2 font-bold text-xl">{title}</div>
        {title !== "🏠Home Page" && (
          <div className="flex-none mr-1">
            <div className="dropdown dropdown-bottom dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm btn-circle btn-outline text-white hover:bg-transparent hover:text-white hover:border-white"
              >
                <i className="fa-solid fa-ellipsis fa-xl"></i>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-40"
              >
                <li className="flex justify-center">
                  <DeletePage />
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
