const Footer: React.FC = () => {
  return (
    <footer className=" text-white py-4 ">
      <div className="container mx-auto text-center flex flex-col">
        <p>CONTACT US AT</p>
        <a
          href="mailto:supertoplnw001@gmail.com"
          className="text-2xl md:text-4xl font-semibold my-6"
        >
          supertoplnw001@gmail.com
        </a>
        <a href="mailto:supertoplnw001@gmail.com" className="cursor-pointer">
          &copy; {new Date().getFullYear()} Built by Arhtit Top.
        </a>
      </div>
    </footer>
  );
};

export default Footer;
