import { cleanAndTransformBlocks } from "@/utils/cleanAndTransformBlocks";

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
        themeSettings {
          themeSettings {
            description
            pageNavigation {
              sectionId
              sectionTitle
            }
            socialHandles {
              github {
                handle
                link {
                  target
                  url
                }
              }
              instagram {
                handle
                link {
                  target
                  url
                }
              }
              linkedin {
                handle
                link {
                  target
                  url
                }
              }
            }
          }
        }
        allSettings {
          generalSettingsTitle
          generalSettingsDescription
        }
      }`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  const blocks = cleanAndTransformBlocks(content.data.nodeByUri.blocks);
  const themeSettings = content.data.themeSettings.themeSettings;
  const siteTitle = content.data.allSettings.generalSettingsTitle;
  const siteDescription = content.data.allSettings.generalSettingsDescription;

  return (
    <div className="relative container mx-auto px-5 lg:px-16 xl:px-[10rem]">
      <ClientComponent
        blocks={blocks}
        themeSettings={themeSettings}
        siteTitle={siteTitle}
        siteDescription={siteDescription}
      />
    </div>
  );
}
