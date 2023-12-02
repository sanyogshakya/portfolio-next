export const getProjectShowcaseData = async (projectIdString) => {
  const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
    },
    body: JSON.stringify({
      query: `query getProjectsShowcaseData {
    projects(where: { in: [${projectIdString}] }) {
      nodes {
        title
        excerpt
        featuredImage {
          node {
            title
            sourceUrl
          }
        }
        customFieldsProjects {
          projectUrl
          technologies {
            technology
          }
        }
      }
    }
  }`,
    }),
  });

  const projectData = await res.json();

  return projectData;
};
