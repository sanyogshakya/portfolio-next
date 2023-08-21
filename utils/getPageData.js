export const getPageData = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
    },
    body: JSON.stringify({
      query: `query getPageData {
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
  });

  const pageData = await res.json();

  return pageData;
};
