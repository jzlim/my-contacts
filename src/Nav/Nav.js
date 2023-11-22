import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="flex flex-row lg:flex-col items-center p-4 lg:p-8 gap-8 lg:gap-12 text-lg lg:text-2xl">
      <div className="cursor-default text-[#ff9900]">Rick And Morty</div>
      <Link className="cursor-pointer" to={`contact`}>
        Contact
      </Link>
    </div>
  );
}

export default Nav;
