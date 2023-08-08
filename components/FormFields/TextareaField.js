export const TextareaField = ({ fieldAttr, value, onChange }) => {
  return (
    <textarea
      id={fieldAttr.id}
      required={fieldAttr.isRequired}
      value={value}
      onChange={onChange}
    />
  );
};
