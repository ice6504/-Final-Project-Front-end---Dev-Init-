"use client";

import { useState } from "react";

function ToTop() {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 250) {
      setVisible(true);
    } else if (scrolled <= 250) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", toggleVisible);
  return (
    <div className={`z-30 fixed bottom-5 right-5 tooltip tooltip-left ${visible ? "" : "hidden"}`} data-tip="Scroll To Top">
      <button
        className="btn btn-outline btn-circle btn-primary drop-shadow-xl"
        onClick={scrollToTop}
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </div>
  );
}

export default ToTop;
