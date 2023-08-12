"use client";
// import useSWR from "swr";
// import { request } from "graphql-request";
import { FormField } from "./FormField";
import { useEffect, useState } from "react";
import { getFormFields, submitFormFields } from "@/utils/formUtils";
import { FieldError } from "./FieldError";

// const fetcher = (query) => request("http://localhost/portfolio/graphql", query);

export const Form = ({ gravityFormId }) => {
  const [formData, setFormData] = useState({});
  const [fieldValues, setFieldValues] = useState([]); // for passing values when submitting form
  const [inputFields, setInputFields] = useState({}); // for updating values in dom
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getContactForm = async (formId) => {
      const result = await getFormFields(formId);
      setFormData(result);
      // initializeInputFields(result.data.gfForm.formFields.nodes);
    };
    getContactForm(gravityFormId);
  }, []);

  const submitButtonText = formData?.data?.gfForm?.submitButton?.text;
  const formFields = formData?.data?.gfForm?.formFields?.nodes;

  const initializeInputFields = (fields) => {
    const inputs = {};
    console.log(fields);
    fields.map((field) => {
      inputs[`form-field-${gravityFormId}-${field.id}`] = "";
    });
    setInputFields(inputs);
  };

  const validateValues = (inputValues) => {
    let errors = {};
    // Name
    if (
      inputValues["form-field-1-3"] &&
      inputValues["form-field-1-3"].length < 5
    ) {
      errors["form-field-1-3"] =
        "This field must contain at least 5 characters.";
    }
    // Email
    if (
      inputValues["form-field-1-5"] &&
      !inputValues["form-field-1-5"].match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      errors["form-field-1-5"] =
        "The email address entered is invalid, please check the formatting (e.g. email@domain.com).";
    }
    // Message
    if (
      inputValues["form-field-1-6"] &&
      inputValues["form-field-1-6"].length < 15
    ) {
      errors["form-field-1-6"] =
        "This field must contain at least 15 characters.";
    }
    return errors;
  };

  let validationTimeout;
  function fieldChangeHandler(e) {
    if (typeof validationTimeout === "number") clearTimeout(validationTimeout);
    const fieldId = e.target.id;
    const fieldValue = e.target.value;
    const fieldType = e.target.type;

    // updating values to be passed when form is submitted
    setFieldValues((current) => {
      switch (fieldType) {
        case "email":
          if (current.find((obj) => obj.id === parseInt(fieldId))) {
            const objIndex = current.findIndex(
              (obj) => obj.id === parseInt(fieldId)
            );
            current[objIndex].emailValues.value = fieldValue;
            return current;
          } else {
            return [
              ...current,
              { id: parseInt(fieldId), emailValues: { value: fieldValue } },
            ];
          }
          break;
        case "address":
          return current;
        default:
          if (current.find((obj) => obj.id === parseInt(fieldId))) {
            const objIndex = current.findIndex(
              (obj) => obj.id === parseInt(fieldId)
            );
            current[objIndex].value = fieldValue;
            return current;
          } else {
            return [...current, { id: parseInt(fieldId), value: fieldValue }];
          }
      }
    });

    // updating field values in DOM
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    console.log(inputFields);

    validationTimeout = setTimeout(() => {
      setErrors(validateValues(inputFields));
    }, 2000);
    console.log(validationTimeout);
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setSubmitting(true);
  };

  const finishSubmit = async () => {
    const submitResponse = await submitFormFields(fieldValues);
    console.log(submitResponse);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);

  return (
    <>
      {Object.keys(errors).length === 0 && submitting ? (
        <span className="success">Successfully submitted ✓</span>
      ) : null}
      {formFields && formFields.length > 0 && (
        <form id={gravityFormId} onSubmit={(e) => formSubmitHandler(e)}>
          {formFields.map((field) => {
            return (
              <div key={field.id} className="text-black-200 relative focused">
                <label className={`absolute top-[1.05rem] left-3`}>
                  {field.label}
                </label>
                <FormField
                  className={`bg-black-500 text-white-300 p-3 pt-5 rounded block w-full mb-5`}
                  formId={gravityFormId}
                  fieldAttr={field}
                  value={
                    inputFields[`form-field-${gravityFormId}-${field.id}`] || ""
                  }
                  onChange={fieldChangeHandler}
                  // onBlur={fieldBlurHandler}
                />
                {errors[`form-field-${gravityFormId}-${field.id}`] ? (
                  <p className="error">
                    {errors[`form-field-${gravityFormId}-${field.id}`]}
                  </p>
                ) : null}
              </div>
            );
          })}
          <button onClick={(e) => formSubmitHandler(e)}>
            {submitButtonText ? submitButtonText : "Send"}
          </button>
        </form>
      )}
    </>
  );
};
