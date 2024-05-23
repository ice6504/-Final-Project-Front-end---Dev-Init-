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

  // useEffect(() => {
  //   const preventLinks = localStorage.getItem(STORAGE_KEY);
  //   if (preventLinks) {
  //     setLinks(JSON.parse(preventLinks));
  //   }
  // }, [links]);

  const filterLinks = links.filter((link) => link.type === type);

  return (
    <>
      {filterLinks.map((link) => {
        return (
          <li key={link.id}>
            <Link href={link.href}>{link.title}</Link>
          </li>
        );
      })}
    </>
  );
};

export default ListLinks;
