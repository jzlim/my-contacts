import { Outlet } from "react-router-dom";
import ContactList from "./ContactList/ContactList";

function ContactWrapper() {
  return (
    <div className="flex h-[90%] lg:h-full w-full lg:w-[85%]">
      <div className="w-[30%] border-solid border-r-[.1rem] border-r-white">
        <ContactList />
      </div>
      <div className="w-[70%]">
        <Outlet />
      </div>
    </div>
  );
}

export default ContactWrapper;
