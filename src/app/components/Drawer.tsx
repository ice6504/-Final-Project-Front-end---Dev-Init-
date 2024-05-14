"use client";
import { useState } from "react";
import Navbar from "./Navbar";

function Drawer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <Navbar />
          {/* Page content here */}
          <div className="min-h-screen w-full lg:w-[calc(100vw-15rem)] max-lg:pt-[4.5rem]">
            {children}
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="py-2 w-60 h-screen bg-base-200">
            <div className="flex justify-between items-center px-2">
              <span className="text-3xl font-extrabold">Menu</span>
              <div className="">
                <button
                  // onClick={}
                  className="btn btn-ghost btn-square size-fit px-2"
                >
                  <i className="fa-solid fa-pen-to-square fa-2xl"></i>
                </button>
              </div>
            </div>
            <ul className="menu text-lg font-medium">
              {/* Sidebar content here */}
              <li>
                <a>Page 1</a>
              </li>
              <li>
                <a>Page 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
