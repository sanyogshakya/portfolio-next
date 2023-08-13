export const Button = ({ children }) => {
  const variantClasses =
    "bg-accent-200 text-black-100 border-2 border-accent-200 rounded hover:bg-transparent hover:text-white-200";
  return (
    <button className={`${variantClasses} text-lg py-3 px-7 font-bold`}>
      {children}
    </button>
  );
};
