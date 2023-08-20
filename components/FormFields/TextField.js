export const TextField = ({
  fieldAttr,
  value,
  formId,
  className,
  onChange,
  onBlur,
  onFocus,
  id,
  name,
}) => {
  return (
    <input
      type={fieldAttr.type.toLowerCase()}
      name={`form-field-${formId}-${fieldAttr.id}`}
      id={fieldAttr.id}
      required={fieldAttr.isRequired}
      value={value}
      className={className}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};
