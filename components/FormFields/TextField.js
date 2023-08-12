export const TextField = ({
  fieldAttr,
  value,
  onChange,
  onBlur,
  formId,
  className,
}) => {
  return (
    <input
      type={fieldAttr.type.toLowerCase()}
      name={`form-field-${formId}-${fieldAttr.id}`}
      id={fieldAttr.id}
      required={fieldAttr.isRequired}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={className}
    />
  );
};
