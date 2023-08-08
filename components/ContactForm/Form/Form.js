import useSWR from "swr";
import { request } from "graphql-request";
import { FormField } from "./FormField";
import { useEffect, useState } from "react";

const fetcher = (query) => request("http://localhost/portfolio/graphql", query);

export const Form = ({ gravityFormId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldValues, setFieldValues] = useState([]);

  const { data: formData, error } = useSWR(
    `{
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
    fetcher
  );

  const formFields = formData?.gfForm?.formFields?.nodes;
  const submitButtonText = formData?.gfForm?.submitButton?.text;

  const { data: submitResponse } = useSWR(
    `mutation MyMutation {
    submitGfForm(
      input: {id: "1", entryMeta: {createdById: 1}, fieldValues: {id: 3, value: "this is a value"}, saveAsDraft: false}
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
    fetcher
  );

  const getResults = () => {
    //do some other stuff using 'data' and 'error'...
    return submitResponse;
  };

  useEffect(() => {
    let myresults;

    if (isSubmitting) {
      myresults = getResults();
      console.log(myresults);
    }
  }, [isSubmitting]);

  useEffect(() => {
    console.log(fieldValues);
  }, [fieldValues]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  const fieldChangeHandler = (e) => {
    const fieldId = e.target.id;
    const fieldValue = e.target.value;
    setFieldValues((current) => [...current, { [fieldId]: fieldValue }]);
    console.log(fieldValues);
  };

  return (
    <>
      {formFields && formFields.length > 0 && (
        <form id={gravityFormId}>
          {formFields.map((field) => (
            <div className="">
              <label>{field.label}</label>
              <FormField
                fieldAttr={field}
                key={field.id}
                value={fieldValues[field.id]}
                onChange={(e) => fieldChangeHandler(e)}
              />
            </div>
          ))}
          <button onClick={(e) => formSubmitHandler(e)}>
            {submitButtonText ? submitButtonText : "Send"}
          </button>
        </form>
      )}
    </>
  );
};
