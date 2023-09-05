import Link from "next/link";
import { Archivo } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-[100dvh] min-h-[30rem]">
      <div className="container mx-auto px-4 text-center">
        <svg
          id="eWKYx0wajhn1"
          viewBox="0 0 512 532"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className={`mx-auto mb-8 w-[100px] h-[100px] shrink-0`}
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
        <h3 className="mt-3 mb-8 text-4xl font-bold">Not Found</h3>
        <p className="mb-8">Could not find requested resource</p>
        <Link
          href="/"
          className="text-accent-200 hover:text-accent-100 mb-8 inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
