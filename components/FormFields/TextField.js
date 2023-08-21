export const TextField = ({
  fieldAttr,
  value,
  className,
  onChange,
  onBlur,
  onFocus,
  id,
  dataId,
  name,
}) => {
  return (
    <input
      type={fieldAttr.type.toLowerCase()}
      name={name}
      id={id}
      data-id={dataId}
      required={fieldAttr.isRequired}
      value={value}
      className={className}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};
