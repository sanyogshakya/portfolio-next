import { gql } from "@apollo/client";
import client from "client";
import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";
import { mapMainMenuItems } from "./mapMainMenuItems";

export const getPageStaticProps = async (context) => {
  console.log("CONTEXT: ", context);
  const uri = context.params?.slug ? `/${context.params.slug.join("/")}/` : "/";

  const { data } = await client.query({
    query: gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            blocks
            id
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
            seo {
              title
              description
            }
          }
        }
        themeSettings {
          themeSettings {
            headerMenu {
              menuItems {
                title
                destination {
                  ... on Page {
                    uri
                  }
                }
                submenuItems {
                  title
                  destination {
                    ... on Page {
                      uri
                    }
                  }
                }
              }
            }
            siteTitle
            headerLogo {
              altText
              sourceUrl
            }
            socialHandles {
              github {
                handle
                link {
                  target
                  title
                  url
                }
              }
              instagram {
                handle
                link {
                  url
                  target
                  title
                }
              }
              linkedin {
                handle
                link {
                  target
                  title
                  url
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      uri,
    },
  });
  const blocks = cleanAndTransformBlocks(data.nodeByUri.blocks);
  return {
    props: {
      seo: data.nodeByUri.seo,
      title: data.nodeByUri.title,
      featuredImage: data.nodeByUri.featuredImage?.node?.sourceUrl || null,
      mainMenuItems: mapMainMenuItems(
        data.themeSettings.themeSettings.headerMenu.menuItems
      ),
      siteTitle: data.themeSettings.themeSettings.siteTitle,
      headerLogo: data.themeSettings.themeSettings.headerLogo,
      socialHandles: data.themeSettings.themeSettings.socialHandles,
      // callToActionLabel:
      //   data.acfOptionsMainMenu.mainMenu.callToActionButton.label,
      // callToActionDestination:
      //   data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
      blocks,
    },
  };
};
