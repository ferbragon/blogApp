"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Variants for the navbar animation
const variants = {
  hidden: { y: "-100%" },
  visible: { y: "0%" },
};

// Navbar component
const NavBar = ({}) => {
  // Local state
  // The state showNavbar will allow us to hide or show the navbar during the scroll animation
  const [showNavbar, setShowNavbar] = useState(true);
  /* The showSearch state will allow us to display the Search component if the screen*/
  const [showSearch, setShowSearch] = useState(false);
  /* The topStyles state will allow us to control the fade-out animation of the navbar along with the scroll animation
  also the navbar buttons text color and background buttons  */
  const [topStyles, setTopStyles] = useState(true);

  // Using a useRef to track the last scroll position
  const lastScrollTop = useRef(0);

  // Function to handle the scroll event
  function handleScroll() {
    // Get the current scroll position
    let st = window.scrollY || document.documentElement.scrollTop;

    // Check if scrolling down or up
    if (st > lastScrollTop.current) {
      // Scroll down: Hide the navbar
      setShowNavbar(false);
    } else {
      // Scroll up: Show the navbar
      setShowNavbar(true);
    }

    // Set the theme for the navbar and text color based on the scroll position
    setTopStyles(st <= 100);

    // Update the last scroll position
    lastScrollTop.current = st <= 0 ? 0 : st;
  }

  // Add a scroll event listener to the window when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Remove the scroll event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to showMenu
  const handleShowSearch = () => {
    setShowSearch(!showSearch);

    document.body.style.overflowY = showSearch ? "auto" : "hidden";
  };

  return (
    <>
      {/* // If the screen is larger than 1100 px, the Navbar is displayed with all its buttons. */}
      <motion.div
        className={`transition-all duration-1000 sticky top-0 w-full h-20 flex flex-row items-center justify-center z-10 ${
          topStyles ? "b-transparent" : "background"
        }`}
        variants={variants}
        initial="hidden"
        animate={showNavbar ? "visible" : "hidden"}
        transition={{ duration: 0 }}
      >
        <div className="w-full flex justify-between padding">
          <div className="w-6/10 h-full flex flex-row items-center justify-end">
            <span className={`logo ${topStyles ? "text-[#000]" : ""}`}>
              Wifi
            </span>
          </div>
          <div className="w-3/10 h-full flex items-center justify-end pr-30">
            Search button
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default NavBar;
