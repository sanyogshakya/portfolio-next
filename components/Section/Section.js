export const Section = ({ children, id, className }) => {
  return (
    <section
      id={id}
      className={`section pt-14 lg:pt-16 ${className && className}`}
    >
      {children}
    </section>
  );
};
