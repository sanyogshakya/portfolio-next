export const TextareaField = ({
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
    <textarea
      className={`${className} h-[150px]`}
      required={fieldAttr.isRequired}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      id={id}
      data-id={dataId}
      name={name}
    />
  );
};
