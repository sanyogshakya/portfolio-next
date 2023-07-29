"use client";
import Link from "next/link";
import { TwoColumnPageWrapper } from "../TwoColumnPageWrapper";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { BlockRenderer } from "../BlockRenderer";
import { useEffect, useState, useRef } from "react";

import { Manrope, Archivo } from "next/font/google";

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

export const ClientComponent = ({ blocks }) => {
  const [activeSection, setActiveSection] = useState(null);
  const sections = useRef([]);

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

  useEffect(() => {
    sections.current = document.querySelectorAll(".section");
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <TwoColumnPageWrapper>
      <header className="sticky top-0 py-8 max-h-[100vh] lg:py-16 flex-[1_1_20%] 2xl:flex-[1_1_50%]">
        <svg
          id="eWKYx0wajhn1"
          viewBox="0 0 512 532"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className={`mb-8`}
        >
          <defs id="defs26" />
          <text
            dx="0"
            dy="0"
            className={archivo.className}
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
            stroke="currentColor"
            strokeWidth="20"
            strokeLinejoin="round"
            transform="translate(293, 298)"
            className={`stroke-accent-200`}
          />
        </svg>
        <h1
          className={`${archivo.className} font-semibold text-4xl uppercase 2xl:text-5xl`}
        >
          Sanyog Shakya
        </h1>
        <h2 className={`mt-3 font-medium text-lg leading-normal 2xl:text-xl`}>
          Developer at EB Pearls
        </h2>
        <p className={`mt-4 leading-normal max-w-[300px]`}>
          I craft accessible and dynamic digital experiences for the web.
        </p>
        <nav className={`home-nav mt-16`}>
          <ul>
            <li>
              <Link
                href="#about"
                className={`${
                  activeSection == "about" && "active"
                } home-nav__link inline-flex items-center home-nav__link-title py-2 hover:text-accent-200`}
              >
                ABOUT
                <span className="link-circles inline-block leading-[0] inline-flex items-center">
                  <span className="link-circle inline-block ml-3"></span>
                  <span className="link-circle inline-block ml-[-5px]"></span>
                  <span className="link-circle inline-block ml-[-5px]"></span>
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="#experience"
                className={`${
                  activeSection == "experience" && "active"
                } home-nav__link inline-flex items-center home-nav__link-title py-2 hover:text-accent-200`}
              >
                EXPERIENCE
                <span className="link-circles inline-block leading-[0] inline-flex items-center border-current">
                  <span className="link-circle inline-block ml-3 border-current"></span>
                  <span className="link-circle inline-block ml-[-5px] border-current"></span>
                  <span className="link-circle inline-block ml-[-5px] border-current"></span>
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className={`${
                  activeSection == "contact" && "active"
                } home-nav__link inline-flex items-center home-nav__link-title py-2 hover:text-accent-200`}
              >
                PROJECTS
                <span className="link-circles inline-block leading-[0] inline-flex items-center">
                  <span className="link-circle inline-block ml-3"></span>
                  <span className="link-circle inline-block ml-[-5px]"></span>
                  <span className="link-circle inline-block ml-[-5px]"></span>
                </span>
              </Link>
            </li>
          </ul>
        </nav>
        <ul className="mt-16 flex gap-4">
          <li>
            <Link href="#" aria-label="github">
              <FaGithub className="w-6 h-6 hover:text-accent-200" />
            </Link>
          </li>
          <li>
            <Link href="#" aria-label="instagram">
              <FaInstagram className="w-6 h-6 hover:text-accent-200" />
            </Link>
          </li>
          <li>
            <Link href="#" aria-label="linkedin">
              <FaLinkedin className="w-6 h-6 hover:text-accent-200" />
            </Link>
          </li>
        </ul>
      </header>
      <main className="sticky flex-[1_1_80%] 2xl:flex-[1_1_50%]">
        <section id="about" className={`section pt-8 lg:pt-16`}>
          <h3 className="mb-10 text-3xl font-bold">About Me</h3>
          <p>
            I am a web developer driven by the pure joy of creation! Building
            things that others dream of is what truly fulfills me. From
            innovative ideas to captivating web experiences, I love bringing
            visions to digital reality with code. Started as a{" "}
            <Link href="https://wordpress.org" target="_blank">
              WordPress
            </Link>{" "}
            plugin developer today, I build accessible and applicable websites.
          </p>
          <p>
            Currently I build{" "}
            <Link
              href="https://en.wikipedia.org/wiki/Content_management_system/"
              target="_blank"
            >
              CMS
            </Link>{" "}
            and{" "}
            <Link
              href="https://en.wikipedia.org/wiki/E-commerce/"
              target="_blank"
            >
              E-commerce
            </Link>{" "}
            websites for our clients at{" "}
            <Link
              href="https://ebpearls.com.au/website-design-sydney/"
              target="_blank"
            >
              EB Pearls
            </Link>{" "}
            and when I am off duty I work on personal projects to learn new
            stuff.
          </p>
          <p>
            I love to workout to stay fit and hunt for food at new places.
            Contradictory, I know!
          </p>
        </section>
        <section id="experience" className={`section pt-8 lg:pt-16`}>
          <h3 className="mb-10 text-3xl font-bold">Where I've Worked</h3>
          <ul className="experience-list">
            <li className="experience-item pb-8">
              <h4 className="title text-xl font-bold text-white-200 mb-1">
                Developer --{" "}
                <Link href="https://ebpearls.com.au/">EB Pearls</Link>
              </h4>
              <h6 className="text-sm text-white-500 font-medium mb-3">
                May 2022 - Present
              </h6>
              <ul className="">
                <li className="pl-6 mb-3 diamond relative">
                  Build custom WordPress Themes that match the brand of the
                  business and that mmeets the requirements of the clients.
                </li>
                <li className="mb-3 pl-6 diamond relative">
                  With user-friendly backend using ACF, Gravity Forms for
                  clients to update the website content easily.
                </li>
                <li className="pl-6 diamond relative">
                  Topped off with accessible and dynamic user experience and
                  beautiful user-interface.
                </li>
              </ul>
            </li>
            <li className="experience-item">
              <h3 className="title">Wordpress Plugin Developer and Intern</h3>
              <h4 className="org">
                <Link href="https://ebpearls.com.au/">Access Keys</Link>
              </h4>
              <h5>February 2021 - May 2022</h5>
              <ul>
                <li>
                  I started here as an Intern and completed my PHP and WordPress
                  crash course.
                </li>
                <li>
                  Maintained and added new features to existing WordPress
                  plugins.
                </li>
                <li>Customized existing plugins as required by the clients.</li>
                <li>Built new featureful and accessible plugins.</li>
              </ul>
            </li>
          </ul>
        </section>
        <section id="contact" className={`section pt-8 lg:pt-16`}>
          <h3 className={"my-8"}>Contact</h3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor
          morbi non arcu risus quis. Tortor vitae purus faucibus ornare.
          Tristique risus nec feugiat in fermentum posuere urna nec. Lacus
          laoreet non curabitur gravida. Tortor posuere ac ut consequat semper
          viverra. Faucibus purus in massa tempor nec. Nisl rhoncus mattis
          rhoncus urna neque viverra justo nec. Leo in vitae turpis massa sed
          elementum tempus egestas. Nullam non nisi est sit amet facilisis
          magna. Malesuada pellentesque elit eget gravida. Risus commodo viverra
          maecenas accumsan lacus vel facilisis. At imperdiet dui accumsan sit
          amet nulla facilisi morbi tempus. Ultrices tincidunt arcu non sodales.
          In hac habitasse platea dictumst quisque. Elit sed vulputate mi sit
          amet mauris commodo. Fermentum dui faucibus in ornare quam. Adipiscing
          elit ut aliquam purus sit amet. Urna condimentum mattis pellentesque
          id nibh tortor id aliquet. Aenean et tortor at risus viverra
          adipiscing at in. Lobortis elementum nibh tellus molestie. Id velit ut
          tortor pretium viverra. Eget aliquet nibh praesent tristique. Suscipit
          adipiscing bibendum est ultricies integer quis auctor. Tristique et
          egestas quis ipsum suspendisse ultrices. Blandit cursus risus at
          ultrices mi tempus. Egestas congue quisque egestas diam in arcu
          cursus. Rhoncus est pellentesque elit ullamcorper dignissim cras. Amet
          consectetur adipiscing elit ut aliquam purus. Aenean vel elit
          scelerisque mauris pellentesque pulvinar pellentesque habitant morbi.
          Nunc aliquet bibendum enim facilisis gravida neque convallis a cras.
          Mattis molestie a iaculis at erat pellentesque adipiscing. Integer
          eget aliquet nibh praesent tristique magna sit. Cras sed felis eget
          velit aliquet sagittis id consectetur. Egestas diam in arcu cursus
          euismod quis viverra nibh cras. Hac habitasse platea dictumst
          vestibulum. Nunc sed augue lacus viverra vitae congue eu. Duis
          convallis convallis tellus id interdum velit laoreet id. Quam nulla
          porttitor massa id. Fusce ut placerat orci nulla pellentesque
          dignissim. Turpis cursus in hac habitasse platea dictumst. Pharetra
          pharetra massa massa ultricies mi quis. Duis at consectetur lorem
          donec massa sapien faucibus. Eget lorem dolor sed viverra. Nulla
          porttitor massa id neque aliquam. Varius sit amet mattis vulputate
          enim nulla. Lacus vestibulum sed arcu non. In dictum non consectetur a
          erat nam. Ut sem nulla pharetra diam. Ut faucibus pulvinar elementum
          integer enim. Nec feugiat in fermentum posuere. Elit ut aliquam purus
          sit amet. Tincidunt dui ut ornare lectus sit amet est placerat in.
          Facilisi cras fermentum odio eu feugiat. Nulla pharetra diam sit amet
          nisl suscipit adipiscing bibendum. Scelerisque mauris pellentesque
          pulvinar pellentesque habitant morbi. Odio aenean sed adipiscing diam
          donec. Ullamcorper sit amet risus nullam eget felis eget nunc. Justo
          donec enim diam vulputate ut pharetra sit amet. Nunc id cursus metus
          aliquam eleifend. Mattis enim ut tellus elementum sagittis vitae.
          Faucibus interdum posuere lorem ipsum dolor sit. Commodo sed egestas
          egestas fringilla phasellus faucibus scelerisque. A diam maecenas sed
          enim ut. Morbi tempus iaculis urna id volutpat lacus laoreet. Faucibus
          interdum posuere lorem ipsum dolor sit amet. At elementum eu facilisis
          sed odio. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl.
          Enim ut tellus elementum sagittis vitae et leo duis ut. Penatibus et
          magnis dis parturient montes. Odio eu feugiat pretium nibh ipsum
          consequat nisl.
        </section>
        <BlockRenderer blocks={blocks} />
      </main>
    </TwoColumnPageWrapper>
  );
};
