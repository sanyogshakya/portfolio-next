import { TextField } from "@/components/FormFields/TextField";
import { TextareaField } from "@/components/FormFields/TextareaField";

export const FormField = ({
  fieldAttr,
  value,
  onChange,
  onBlur,
  formId,
  className,
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
          formId={formId}
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
          formId={formId}
        />
      );
    }
  }
};
