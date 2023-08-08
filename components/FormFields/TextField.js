export const TextField = ({ fieldAttr, value, onChange }) => {
  return (
    <input
      type={fieldAttr.type.toLowerCase()}
      id={fieldAttr.id}
      required={fieldAttr.isRequired}
      value={value}
      onChange={onChange}
    />
  );
};
