import React, { FC } from "react";

interface HeaderProps {
  title: string;
}

const Navbar: FC<HeaderProps> = ({ title }) => {
  return (
    <div className="w-full navbar bg-primary text-base-100 z-[100] fixed top-0 lg:hidden">
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
    </div>
  );
};

export default Navbar;
