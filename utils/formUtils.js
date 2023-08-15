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

function customStringify(obj_from_json) {
  if (typeof obj_from_json !== "object" || Array.isArray(obj_from_json)) {
    // not an object, stringify using native function
    return JSON.stringify(obj_from_json);
  }
  // Implements recursive object serialization according to JSON spec
  // but without quotes around the keys.
  let props = Object.keys(obj_from_json)
    .map((key) => `${key}:${customStringify(obj_from_json[key])}`)
    .join(",");
  return `{${props}}`;
}

export const submitFormFields = async (fieldValues) => {
  console.log(fieldValues);
  let jsonFieldValues = JSON.stringify(fieldValues);
  jsonFieldValues = jsonFieldValues.replace(/\\"/g, "\uFFFF"); // U+ FFFF
  jsonFieldValues = jsonFieldValues
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/\uFFFF/g, '\\"');
  console.log(jsonFieldValues);
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
