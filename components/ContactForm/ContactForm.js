import { Form } from "./Form";

export const ContactForm = ({ data }) => {
  console.log(data);
  return (
    <section id="contact" className={`section pt-8 lg:pt-16`}>
      <h3 className="mt-3 mb-6 text-4xl font-bold">{data.title}</h3>
      <Form gravityFormId={data.gravity_form_id} />
    </section>
  );
};
