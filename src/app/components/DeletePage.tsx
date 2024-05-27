"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Links {
  id: number;
  date: string;
  title: string;
  type: string;
  href: string;
}

const STORAGE_KEY = "sidebarLinks";

function DeletePage() {
  const [links, setLinks] = useState<Links[]>(() => {
    const savedLinks = localStorage.getItem(STORAGE_KEY);
    return savedLinks ? JSON.parse(savedLinks) : [];
  });
  const { title } = useParams();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  }, [links]);

  const deletePage = () => {
    const id = Array.isArray(title) ? title[0] : title;
    if (id) {
      const decodedId = decodeURIComponent(id);
      const ampersandIndex = decodedId.indexOf("&");
      const linkId = decodedId.slice(ampersandIndex + 1);
      const updatedLinks = links.filter((link) => link.id !== Number(linkId));
      setLinks(updatedLinks);
      localStorage.removeItem(decodedId);
      window.location.href = "/";
    }
  };

  return (
    <button
      className="btn btn-outline btn-error rounded-full"
      onClick={deletePage}
    >
      <i className="fa-solid fa-trash"></i> This Page
    </button>
  );
}

export default DeletePage;
