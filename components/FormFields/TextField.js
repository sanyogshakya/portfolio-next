export const TextField = ({
  fieldAttr,
  value,
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
      name={name}
      id={id}
      required={fieldAttr.isRequired}
      value={value}
      className={className}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};
