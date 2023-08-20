"use client";
// import useSWR from "swr";
// import { request } from "graphql-request";
import { FormField } from "./FormField";
import { useEffect, useState } from "react";
import { getFormFields, submitFormFields } from "@/utils/formUtils";
import { FieldError } from "./FieldError";
import { Button } from "@/components/Button/Button";

// const fetcher = (query) => request("http://localhost/portfolio/graphql", query);

export const Form = ({ gravityFormId }) => {
  const [formData, setFormData] = useState({});
  const [fieldValues, setFieldValues] = useState([]); // for passing values when submitting form
  const [inputFields, setInputFields] = useState({}); // for updating values in dom
  const [errors, setErrors] = useState({});
  const [focuses, setFocuses] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const getContactForm = async (formId) => {
      const result = await getFormFields(formId);
      setFormData(result);
      // initializeInputFields(result.data.gfForm.formFields.nodes);
    };
    getContactForm(gravityFormId);
  }, [gravityFormId]);

  const submitButtonText = formData?.data?.gfForm?.submitButton?.text;
  const formFields = formData?.data?.gfForm?.formFields?.nodes;

  const validateValues = (inputValues, submitErrors = []) => {
    let errors = {};
    // Name
    if (
      inputValues["form-field-1-3"] &&
      inputValues["form-field-1-3"].length < 3
    ) {
      errors["form-field-1-3"] =
        "This field must contain at least 3 characters.";
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
    if (submitErrors) {
      submitErrors.map((error) => {
        errors[`form-field-${gravityFormId}-${error.id}`] = error.message;
      });
    }
    return errors;
  };

  let validationTimeout;
  function fieldChangeHandler(e) {
    setSubmitted((current) => {
      current && !current;
    });
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
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setSubmitting(true);
  };

  useEffect(() => {
    validationTimeout = setTimeout(() => {
      setErrors(validateValues(inputFields));
    }, 2000);
  }, [inputFields]);

  useEffect(() => {
    const finishSubmit = async () => {
      const submitResponse = await submitFormFields(fieldValues);
      if (submitResponse?.data?.submitGfForm?.errors) {
        setErrors(
          validateValues(inputFields, submitResponse.data.submitGfForm.errors)
        );
        setSubmitting(false);
      } else {
        setSubmitDisabled(false);
        setSubmitted(true);
        setInputFields({});
        setSubmitting(false);
        setFocuses({});
        setFieldValues({});
        setErrors({});
      }
    };
    if (Object.keys(errors).length !== 0 || submitting) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
    if (submitting) {
      finishSubmit();
    }
  }, [submitting]);

  const fieldBlurHandler = (e) => {
    if (e.target.value === "") {
      setFocuses({ ...focuses, [e.target.name]: false });
    }
  };

  const fieldFocusHandler = (e) => {
    setFocuses({ ...focuses, [e.target.name]: true });
  };

  if (formFields && formFields.length) {
    return (
      <>
        <form
          id={gravityFormId}
          disabled={submitDisabled}
          onSubmit={(e) => formSubmitHandler(e)}
        >
          {formFields.map((field) => {
            return (
              <div
                key={field.id}
                className={`text-black-200 relative mb-6 ${
                  focuses[`form-field-${gravityFormId}-${field.id}`] &&
                  "focused"
                }`}
              >
                <label
                  className={`absolute top-[1.05rem] left-3 font-semibold text-white-200`}
                >
                  {field.label}
                </label>
                <FormField
                  className={`bg-black-300 text-white-300 p-3 pt-6 rounded block w-full`}
                  formId={gravityFormId}
                  fieldAttr={field}
                  value={
                    inputFields[`form-field-${gravityFormId}-${field.id}`] || ""
                  }
                  onChange={fieldChangeHandler}
                  onFocus={fieldFocusHandler}
                  onBlur={fieldBlurHandler}
                />
                {errors[`form-field-${gravityFormId}-${field.id}`] ? (
                  <p className="text-sm mt-2 font-medium text-red-600">
                    {errors[`form-field-${gravityFormId}-${field.id}`]}
                  </p>
                ) : null}
              </div>
            );
          })}
          <div className="flex gap-4 items-center">
            <Button
              onClick={(e) => formSubmitHandler(e)}
              disabled={submitDisabled}
            >
              {submitButtonText ? submitButtonText : "Send"}
            </Button>
            {submitting && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="30px"
                height="30px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
              >
                <circle
                  cx="50"
                  cy="50"
                  fill="none"
                  stroke="#00acff"
                  strokeWidth="10"
                  r="35"
                  strokeDasharray="164.93361431346415 56.97787143782138"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0 50 50;360 50 50"
                    keyTimes="0;1"
                  ></animateTransform>
                </circle>
              </svg>
            )}
            {submitted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="40px"
                height="40px"
              >
                <path
                  className={`stroke-green-500 fill-none animate-[dash_1s_linear_forwards]`}
                  strokeDasharray={80}
                  strokeDashoffset={80}
                  strokeWidth={1}
                  d="M 28.28125 6.28125 L 11 23.5625 L 3.71875 16.28125 L 2.28125 17.71875 L 10.28125 25.71875 L 11 26.40625 L 11.71875 25.71875 L 29.71875 7.71875 Z"
                />
              </svg>
            )}
          </div>
        </form>
        {submitted && (
          <div className="mt-4 text-green-500 font-bold text-lg tracking-wider">
            Successfully submitted ✓
          </div>
        )}
        {/* )} */}
      </>
    );
  }
  return;
};
