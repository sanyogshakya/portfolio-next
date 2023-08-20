export const getFormFields = async (gravityFormId) => {
  const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query gformFieldQuery{
        gfForm(id: "${gravityFormId}") {
          formFields {
            nodes {
              id
              type
              ... on TextField {
                isRequired
                label
              }
              ... on EmailField {
                label
                isRequired
              }
              ... on TextAreaField {
                label
                isRequired
              }
            }
          }
          submitButton {
            text
          }
        }
      }`,
    }),
  });

  const formData = await res.json();

  return formData;
};

export const submitFormFields = async (fieldValues) => {
  let jsonFieldValues = JSON.stringify(fieldValues);
  jsonFieldValues = jsonFieldValues.replace(/\\"/g, "\uFFFF"); // U+ FFFF
  jsonFieldValues = jsonFieldValues
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/\uFFFF/g, '\\"');
  const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `mutation submitForm {
        submitGfForm(
          input: {id: "1", entryMeta: {createdById: 1}, fieldValues: ${jsonFieldValues}, saveAsDraft: false}
        ) {
          confirmation {
            type
            message
            url
          }
          errors {
            id
            message
          }
          entry {
            id
            ... on GfSubmittedEntry {
              databaseId
            }
          }
        }
      }`,
    }),
  });

  const submitResponse = await res.json();

  return submitResponse;
};
