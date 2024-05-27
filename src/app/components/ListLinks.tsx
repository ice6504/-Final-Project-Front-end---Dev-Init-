"use client";
import { useState, useEffect, FC } from "react";
import Link from "next/link";

const STORAGE_KEY = "sidebarLinks";

interface Props {
  type: string;
}

interface Links {
  id: number;
  date: string;
  title: string;
  type: string;
  href: string;
}

const ListLinks: FC<Props> = ({ type }) => {
  const [links, setLinks] = useState<Links[]>([]);

  useEffect(() => {
    const savedLinks = localStorage.getItem(STORAGE_KEY);
    if (savedLinks) {
      setLinks(JSON.parse(savedLinks));
    }
  }, []);

  const filterLinks = links.filter((link) => link.type === type);

  return (
    <>
      {filterLinks.length > 0 ? (
        filterLinks.map((link) => {
          return (
            <div key={link.id} className="menu menu-lg text-white">
              <li>
                <Link className="font-medium" href={link.href}>{link.title} - {link.date}</Link>
              </li>
            </div>
          );
        })
      ) : (
        <>
          <div className="h-full grid place-content-center text-7xl sm:text-9xl text-white/30">
            <div className="text-center">
              {type === "Note" ? (
                <i className="fa-regular fa-note-sticky"></i>
              ) : (
                <i className="fa-solid fa-list-check"></i>
              )}
              <p className="text-3xl sm:text-5xl font-medium my-2">Empty</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ListLinks;
