"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";

const STORAGE_KEY = "sidebarLinks";

interface Links {
  id: number;
  date: string;
  title: string;
  type: string;
  href: string;
}

function Drawer({ children }: { children: React.ReactNode }) {
  const { title } = useParams<{ title: string }>();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalTitleOpen, setIsModalTitleOpen] = useState<boolean>(false);
  const [links, setLinks] = useState<Links[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<Links[]>([]);
  const [newLinkType, setNewLinkType] = useState<"Note" | "ToDo" | null>(null);
  const [newLinkTitle, setNewLinkTitle] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const savedLinks = localStorage.getItem(STORAGE_KEY);
    if (savedLinks) {
      const parsedLinks = JSON.parse(savedLinks);
      setLinks(parsedLinks);
      setFilteredLinks(parsedLinks);
    }
  }, []);

  useEffect(() => {
    const handle = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
    }, 50);
    return () => clearTimeout(handle);
  }, [links]);

  useEffect(() => {
    setSearch("");
    setFilteredLinks(links);
  }, [title, links]);

  let displayedTitle: string;
  let linkId: number | undefined;
  if (title) {
    const decodedTitle = decodeURIComponent(title);
    const ampersandIndex = decodedTitle.indexOf("&");

    if (ampersandIndex !== -1) {
      displayedTitle = decodedTitle.slice(0, ampersandIndex);
      const paramsId = decodedTitle.slice(ampersandIndex + 1);
      linkId = Number(paramsId);
    } else {
      displayedTitle = decodedTitle;
    }
  } else {
    displayedTitle = "Home Page";
  }

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
      date: `${formattedDate}`,
      title: `${title}`,
      type: `${newLinkType}`,
      href: `/${newLinkType?.toLowerCase()}/${title}&${links.length + 1}`,
    };
    const updatedLinks = [...links, newLink];
    setLinks(updatedLinks);
    setFilteredLinks(updatedLinks);
  };

  const searchPage = (keyword: string) => {
    if (keyword && keyword.trim().length > 0) {
      const searchResults = links.filter((link) =>
        link.title.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredLinks(searchResults);
    } else {
      setFilteredLinks(links);
    }
  };

  console.log(filteredLinks);

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input
          id="my-drawer-3"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          onChange={toggleDrawer}
        />
        <div className="drawer-content flex flex-col">
          <Navbar title={displayedTitle} />
          {/* Content */}
          <main className="min-h-full max-lg:pt-16">{children}</main>
        </div>
        <div className="drawer-side z-[101]">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="w-60 py-2 bg-base-200 px-2 min-h-full">
            <div className="flex justify-between items-center">
              <Link
                href="/"
                className="active:scale-90 transition-all ease-in-out"
                onClick={toggleDrawer}
              >
                <Image
                  className="w-28"
                  src="/Logo.svg"
                  alt="Logo"
                  width={0}
                  height={0}
                  priority={true}
                />
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
            {/* SearchBar */}
            <label className="input input-sm rounded-full h-10 flex items-center gap-2 mt-3">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                className="grow font-medium"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  searchPage(e.target.value);
                }}
              />
            </label>
            {/* Nav */}
            <div>
              <ul className="menu gap-2 text-lg font-bold">
                {search && filteredLinks.length > 0
                  ? filteredLinks.map((link) => (
                      <li key={link.id}>
                        <Link
                          className={`focus-within:bg-primary focus-within:text-base-100 h-20 flex items-center
                          ${
                            displayedTitle === link.title && linkId === link.id
                              ? "bg-primary text-base-100"
                              : ""
                          }
                        `}
                          onClick={toggleDrawer}
                          href={link.href}
                        >
                          {`${link.title} - ${link.date}`}
                        </Link>
                      </li>
                    ))
                  : links.map((link) => (
                      <li key={link.id}>
                        <Link
                          className={`focus-within:bg-primary focus-within:text-base-100 h-20 flex items-center
                          ${
                            displayedTitle === link.title && linkId === link.id
                              ? "bg-primary text-base-100"
                              : ""
                          }
                        `}
                          onClick={toggleDrawer}
                          href={link.href}
                        >
                          {`${link.title} - ${link.date}`}
                        </Link>
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
                maxLength={10}
                placeholder="Add Title"
                className="input bg-primary text-base-100 placeholder:text-base-100/50 w-full mt-8"
                value={newLinkTitle}
                onChange={(e) => setNewLinkTitle(e.target.value)}
              />
              {newLinkTitle.length === 10 ? (
                <>
                  <div className="badge badge-primary badge-outline my-2">
                    Max Length is 10
                  </div>
                </>
              ) : null}
              <button
                type="submit"
                className="btn btn-primary btn-outline  w-full mt-2"
              >
                Save
              </button>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
}

export default Drawer;
