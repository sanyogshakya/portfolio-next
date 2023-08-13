import { cleanAndTransformBlocks } from "@/utils/cleanAndTransformBlocks";

import { Manrope, Archivo } from "next/font/google";
import { getPageData } from "@/utils/getPageData";
import { HeaderHome } from "@/components/HeaderHome";
import { BlockRenderer } from "@/components/BlockRenderer";
import { TwoColumnPageWrapper } from "@/components/TwoColumnPageWrapper";
import { FooterHome } from "@/components/Footer/FooterHome";

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
  const content = await getPageData();

  const blocks = cleanAndTransformBlocks(content.data.nodeByUri.blocks);
  const themeSettings = content.data.themeSettings.themeSettings;
  const siteTitle = content.data.allSettings.generalSettingsTitle;
  const siteDescription = content.data.allSettings.generalSettingsDescription;

  return (
    <div className="relative container mx-auto px-5 md:px-16 xl:px-[10rem]">
      <TwoColumnPageWrapper>
        <HeaderHome
          themeSettings={themeSettings}
          siteTitle={siteTitle}
          siteDescription={siteDescription}
        />
        <div className="flex-[1_1_50%] 2xl:flex-[1_1_58%]">
          <main>
            <BlockRenderer blocks={blocks} />
          </main>
          <FooterHome />
        </div>
      </TwoColumnPageWrapper>
    </div>
  );
}
