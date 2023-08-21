import { Section } from "../Section/Section";
import { Form } from "./Form";

export const ContactForm = ({ data }) => {
  return (
    <Section id={data.section_id}>
      <h3 className="mt-3 mb-8 lg:mb-10 text-4xl font-bold">{data.title}</h3>
      <Form gravityFormId={data.gravity_form_id} />
    </Section>
  );
};
