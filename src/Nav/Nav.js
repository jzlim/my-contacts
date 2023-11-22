import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="flex flex-row lg:flex-col items-center p-4 lg:p-8 gap-8 lg:gap-12 text-lg lg:text-2xl">
      <Link className="cursor-pointer text-[#ff9900]" to={`/`}>
        Rick And Morty
      </Link>
      <Link className="cursor-pointer" to={`contact`}>
        Contact
      </Link>
    </div>
  );
}

export default Nav;
