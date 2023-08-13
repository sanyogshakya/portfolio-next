export const TextareaField = ({
  fieldAttr,
  value,
  formId,
  className,
  onChange,
  onBlur,
  onFocus,
}) => {
  return (
    <textarea
      className={`${className} h-[150px]`}
      id={fieldAttr.id}
      name={`form-field-${formId}-${fieldAttr.id}`}
      required={fieldAttr.isRequired}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};
