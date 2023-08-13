"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Archivo } from "next/font/google";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

const archivo = Archivo({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const HeaderHome = ({ themeSettings, siteTitle, siteDescription }) => {
  const [loading, setLoading] = useState(true);
  const pageNavigation = themeSettings.pageNavigation;
  const socialHandles = themeSettings.socialHandles;

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
    <header className="lg:sticky flex flex-col top-0 pt-4 md:pt-8 max-h-[100vh] lg:py-16 lg:flex-[1_1_50%] 2xl:flex-[1_1_42%]">
      <svg
        id="eWKYx0wajhn1"
        viewBox="0 0 512 532"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className={`mb-8 w-[60px] h-[60px] shrink-0`}
      >
        <defs id="defs26" />
        <text
          dx="0"
          dy="0"
          className={`${archivo.className}`}
          fontSize="320px"
          strokeWidth="0"
          id="text17"
          x="138.36171"
          y="390.10507"
        >
          <tspan y="390.10507" fontWeight="600" strokeWidth="0" id="tspan15">
            S
          </tspan>
        </text>
        <polygon
          id="polygon"
          points="-265.77379,-88.607384 -43.264515,-250.26984 179.24476,-88.607384 94.25378,172.96796 -180.78281,172.96796 "
          fill="none"
          strokeWidth="20"
          strokeLinejoin="round"
          transform="translate(293, 298)"
          className={`stroke-accent-200`}
        />
      </svg>
      <h1
        className={`${archivo.className} font-semibold text-5xl uppercase 2xl:text-5xl`}
      >
        {siteTitle}
      </h1>
      <h2
        className={`mt-3 font-medium text-lg text-white-400 leading-normal 2xl:text-xl`}
      >
        {siteDescription}
      </h2>
      <p className={`mt-4 leading-normal max-w-[300px]`}>
        {themeSettings.description}
      </p>
      {pageNavigation && (
        <nav className={`home-nav mt-16 mb-8 hidden lg:block`}>
          <ul>
            {pageNavigation.map((navItem, index) => {
              const sectionId = navItem.sectionId;
              const sectionTitle = navItem.sectionTitle;

              return (
                <li key={index}>
                  <Link
                    href={`#${sectionId}`}
                    className={`${
                      activeSection === sectionId && "active"
                    } home-nav__link inline-flex items-center home-nav__link-title py-2 hover:text-accent-200`}
                  >
                    {sectionTitle}
                    <span className="link-circles inline-block leading-[0] inline-flex items-center">
                      <span className="link-circle inline-block ml-3"></span>
                      <span className="link-circle inline-block ml-[-5px]"></span>
                      <span className="link-circle inline-block ml-[-5px]"></span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
      <ul className="pt-8 mt-auto flex gap-4">
        <li>
          <Link
            href={socialHandles.github.link.url}
            target={socialHandles.github.link.target}
            aria-label="github"
          >
            <FaGithub className="w-6 h-6 hover:text-accent-200" />
          </Link>
        </li>
        <li>
          <Link
            href={socialHandles.instagram.link.url}
            target={socialHandles.instagram.link.target}
            aria-label="instagram"
          >
            <FaInstagram className="w-6 h-6 hover:text-accent-200" />
          </Link>
        </li>
        <li>
          <Link
            href={socialHandles.linkedin.link.url}
            target={socialHandles.linkedin.link.target}
            aria-label="linkedin"
          >
            <FaLinkedinIn className="w-6 h-6 hover:text-accent-200" />
          </Link>
        </li>
      </ul>
    </header>
  );
};
