export const TextareaField = ({
  fieldAttr,
  value,
  onChange,
  onBlur,
  formId,
  className,
}) => {
  return (
    <textarea
      className={className}
      id={fieldAttr.id}
      name={`form-field-${formId}-${fieldAttr.id}`}
      required={fieldAttr.isRequired}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};
