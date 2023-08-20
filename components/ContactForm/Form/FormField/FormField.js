import { TextField } from "@/components/FormFields/TextField";
import { TextareaField } from "@/components/FormFields/TextareaField";

export const FormField = ({
  fieldAttr,
  className,
  value,
  onChange,
  onBlur,
  onFocus,
  id,
  name,
}) => {
  switch (fieldAttr.type) {
    case "EMAIL":
    case "TEXT": {
      return (
        <TextField
          className={className}
          fieldAttr={fieldAttr}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          id={id}
          name={name}
        />
      );
    }
    case "TEXTAREA": {
      return (
        <TextareaField
          className={className}
          fieldAttr={fieldAttr}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          id={id}
          name={name}
        />
      );
    }
  }
};
