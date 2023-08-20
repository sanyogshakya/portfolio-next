export const TextareaField = ({
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
    <textarea
      className={`${className} h-[150px]`}
      required={fieldAttr.isRequired}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      id={id}
      name={name}
    />
  );
};
