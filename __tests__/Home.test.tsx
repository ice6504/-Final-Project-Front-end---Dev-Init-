import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";
import ListLinks from "@/app/components/ListLinks";

describe("Home", () => {
  it("Home page title can rendered", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { name: /🏠Home Page/i });
    expect(heading).toBeInTheDocument();

    const plannerLink = screen.getByRole("link", { name: /My Planner/i });
    expect(plannerLink).toHaveAttribute("href", "/planner");
  });

  it("renders Note links correctly", () => {
    const noteLinks = [
      {
        id: 1,
        title: "Note 1",
        href: "/note/1",
        date: "2022-06-10",
        type: "Note",
      },
      {
        id: 2,
        title: "Note 2",
        href: "/note/2",
        date: "2022-06-11",
        type: "Note",
      },
      {
        id: 3,
        title: "Note 3",
        href: "/note/3",
        date: "2022-06-12",
        type: "Note",
      },
    ];

    Storage.prototype.getItem = jest.fn(() => JSON.stringify(noteLinks));

    render(<ListLinks type="Note" />);

    noteLinks.forEach((link) => {
      const linkElement = screen.getByRole("link", {
        name: `${link.title} - ${link.date}`,
      });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", link.href);
    });
  });

  it("renders ToDo links correctly", () => {
    const todoLinks = [
      {
        id: 1,
        title: "ToDo 1",
        href: "/todo/1",
        date: "2022-06-10",
        type: "ToDo",
      },
      {
        id: 2,
        title: "ToDo 2",
        href: "/todo/2",
        date: "2022-06-11",
        type: "ToDo",
      },
      {
        id: 3,
        title: "ToDo 3",
        href: "/todo/3",
        date: "2022-06-12",
        type: "ToDo",
      },
    ];

    Storage.prototype.getItem = jest.fn(() => JSON.stringify(todoLinks));

    render(<ListLinks type="ToDo" />);
    todoLinks.map((todoLink) => {
      const linkElement = screen.getByRole("link", {
        name: `${todoLink.title} - ${todoLink.date}`,
      });
      expect(linkElement).toBeInTheDocument;
      expect(linkElement).toHaveAttribute("href", todoLink.href);
    });
  });
});
