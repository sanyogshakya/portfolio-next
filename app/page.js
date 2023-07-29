// import { BlockRenderer } from "@/components/BlockRenderer";
// import { TwoColumnPageWrapper } from "@/components/TwoColumnPageWrapper";
import { cleanAndTransformBlocks } from "@/utils/cleanAndTransformBlocks";
// import Image from "next/image";
// import Link from "next/link";
// import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

import { Manrope, Archivo } from "next/font/google";
import { ClientComponent } from "@/components/ClientComponent/ClientComponent";

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

export default async function Home() {
  const content = await fetch("http://localhost/portfolio/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: `{
        nodeByUri(uri: "/") {
          ... on Page {
            blocks
          }
        }
      }`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  const blocks = cleanAndTransformBlocks(content.data.nodeByUri.blocks);

  return (
    <div className="relative container mx-auto px-5 lg:px-16 xl:px-[10rem]">
      <ClientComponent blocks={blocks} />
    </div>
  );
}
