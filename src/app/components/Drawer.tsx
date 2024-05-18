"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";

const STORAGE_KEY = "sidebarLinks";

function Drawer({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalTitleOpen, setIsModalTitleOpen] = useState(false);
  const [links, setLinks] = useState<
    { id: number; title: string; type: string; href: string }[]
  >([]);
  const [newLinkType, setNewLinkType] = useState<"Note" | "ToDo" | null>(null);
  const [newLinkTitle, setNewLinkTitle] = useState("");

  useEffect(() => {
    const savedLinks = localStorage.getItem(STORAGE_KEY);
    if (savedLinks) {
      setLinks(JSON.parse(savedLinks));
    }
  }, []);

  useEffect(() => {
    const handle = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
    }, 300);
    return () => clearTimeout(handle);
  }, [links]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleModalTitle = () => {
    setIsModalTitleOpen(!isModalTitleOpen);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newLinkTitle) {
      createNewPage(newLinkTitle);
      setNewLinkTitle("");
      toggleModalTitle();
    }
  };

  const createNewPage = (title: string) => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    const newLink = {
      id: links.length + 1,
      title: `${title} - ${formattedDate}`,
      type: `${newLinkType}`,
      href: `/${newLinkType?.toLowerCase()}`,
    };
    setLinks([...links, newLink]);
  };

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input
          id="my-drawer-3"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          onChange={toggleDrawer}
        />
        <div className="drawer-content flex flex-col">
          <Navbar title="Untitled" />
          <div className="min-h-screen w-full lg:w-[calc(100vw-15rem)] pt-10 max-lg:pt-[4.5rem]">
            {children}
          </div>
        </div>
        <div className="drawer-side z-[101]">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="py-2 w-60 bg-base-200 px-2 h-full max-h-screen">
            <div className="flex justify-between items-center h-fit">
              <Link
                href="/"
                className="active:scale-90 transition-all ease-in-out"
                onClick={toggleDrawer}
              >
                <Image src="/Logo.svg" alt="Logo" width={100} height={0} />
              </Link>
              <div>
                <button
                  onClick={toggleModal}
                  className="btn btn-ghost btn-square size-fit px-2"
                >
                  <i className="fa-solid fa-pen-to-square fa-2xl"></i>
                </button>
              </div>
            </div>
            <label className="input input-sm rounded-full h-10 flex items-center gap-2 mt-3 mb-2">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                className="grow font-medium"
                placeholder="Search"
              />
            </label>
            <div className="overflow-y-scroll h-96">
              <ul className="menu gap-2 text-lg font-bold">
                {links.map((link) => (
                  <li key={link.id}>
                    <Link onClick={toggleDrawer} href={link.href}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <dialog open className="modal bg-black/30">
          <div className="modal-box">
            <button
              onClick={toggleModal}
              className="btn btn-sm btn-circle btn-outline btn-primary text-primary absolute right-3 top-2"
            >
              <i className="fa-solid fa-xmark fa-xl"></i>
            </button>
            <form>
              <div className="flex max-sm:flex-col items-center max-sm:gap-2 justify-around mt-6">
                <button
                  type="button"
                  className="btn btn-primary btn-outline w-32 sm:w-56"
                  onClick={() => {
                    setNewLinkType("Note");
                    toggleModal();
                    toggleModalTitle();
                  }}
                >
                  Add Note
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-outline w-32 sm:w-56"
                  onClick={() => {
                    setNewLinkType("ToDo");
                    toggleModal();
                    toggleModalTitle();
                  }}
                >
                  Add ToDo
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {isModalTitleOpen && (
        <dialog open className="modal bg-black/30">
          <div className="modal-box">
            <button
              onClick={toggleModalTitle}
              className="btn btn-sm btn-circle btn-outline btn-primary text-primary absolute right-3 top-2"
            >
              <i className="fa-solid fa-xmark fa-xl"></i>
            </button>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Add Title"
                className="input bg-primary text-base-100 placeholder:text-base-100/50 w-full mt-8"
                value={newLinkTitle}
                onChange={(e) => setNewLinkTitle(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-primary btn-outline  w-full mt-4"
              >
                Save
              </button>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default Drawer;
