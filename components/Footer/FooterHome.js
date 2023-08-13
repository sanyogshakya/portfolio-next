export const FooterHome = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={`py-8 lg:py-16 text-center lg:text-right`}>
      &copy; {year} Sanyog Shakya
    </footer>
  );
};
