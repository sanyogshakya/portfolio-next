"use client";
import Link from "next/link";
import { TwoColumnPageWrapper } from "../TwoColumnPageWrapper";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";
import { BlockRenderer } from "../BlockRenderer";
import { useEffect, useState, useRef } from "react";

import { Manrope, Archivo } from "next/font/google";
import Image from "next/image";
import { HeaderHome } from "../HeaderHome";

// If loading a variable font, you don't need to specify the font weight
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});
const archivo = Archivo({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const ClientComponent = ({
  blocks,
  themeSettings,
  siteTitle,
  siteDescription,
}) => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const sections = useRef([]);
  let idx;

  const handleScroll = () => {
    const pageYOffset = window.scrollY;
    let newActiveSection = null;

    sections.current.forEach((section) => {
      const sectionOffsetTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        pageYOffset + 80 >= sectionOffsetTop &&
        pageYOffset + 80 < sectionOffsetTop + sectionHeight
      ) {
        newActiveSection = section.id;
      }
    });

    setActiveSection(newActiveSection);
  };

  const scrollImage = (e) => {
    const figure = e.target.parentElement;
    idx = setInterval(() => (figure.scrollTop += 1), 15);
  };

  const stopScrollImage = () => {
    clearInterval(idx);
  };

  const disableScroll = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    // To handle section's scroll navigation
    sections.current = document.querySelectorAll(".section");
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    setLoading(false);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection]);
  return (
    <TwoColumnPageWrapper>
      <HeaderHome
        themeSettings={themeSettings}
        activeSection={activeSection}
        siteTitle={siteTitle}
        siteDescription={siteDescription}
      />
      <main className="sticky flex-[1_1_80%] 2xl:flex-[1_1_58%]">
        <BlockRenderer blocks={blocks} />
      </main>
    </TwoColumnPageWrapper>
  );
};
