export const getAllProjectsData = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
    },
    // (where: {offsetPagination: {offset: 0, size: 2}})
    body: JSON.stringify({
      query: `query AllProjectsQuery {
        projects(where: {offsetPagination: {offset: 0, size: 8}}) {
          nodes {
            id
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
            title
            excerpt
            customFieldsProjects {
              projectUrl
              technologies {
                technology
              }
            }
          }
          pageInfo {
            offsetPagination {
              total
              hasMore
            }
          }
        }
      }`,
    }),
  });

  const projectData = await res.json();

  return projectData;
};
