import { useEffect, useState } from "react";

export const SCROLL_UP = "up";
export const SCROLL_DOWN = "down";

const useScrollDirection = () => {
  const [prev, setPrev] = useState(window.scrollY);

  useEffect(() => {
    setPrev(window.scrollY);
  }, [window.scrollY]);
  const handleScroll = (e) => {
    const window = e.target;
    if (prev > window.scrollTop) {
      console.log("UPPP", e);
    } else if (prev < window.scrollTop) {
      console.log("Downnnn", e);
    }
    setPrev(window.scrollTop);
  };
  return handleScroll;
};

export default useScrollDirection;
