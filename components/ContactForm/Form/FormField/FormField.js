import { TextField } from "@/components/FormFields/TextField";
import { TextareaField } from "@/components/FormFields/TextareaField";

export const FormField = ({ fieldAttr, value, onChange }) => {
  switch (fieldAttr.type) {
    case "EMAIL":
    case "TEXT": {
      return (
        <TextField fieldAttr={fieldAttr} value={value} onChange={onChange} />
      );
    }
    case "TEXTAREA": {
      return (
        <TextareaField
          fieldAttr={fieldAttr}
          value={value}
          onChange={onChange}
        />
      );
    }
  }
};
