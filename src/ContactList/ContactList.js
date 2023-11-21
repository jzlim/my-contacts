import Filter from "./Filter/Filter";
import ContactListItem from "./ContactListItem/ContactListItem";

function ContactList() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <span className="block text-xl lg:text-4xl mb-2 lg:mb-4">Contact</span>
        <Filter />
      </div>
      <hr className="border-t-[.1rem] border-white border-solid" />
      <div className="flex flex-col items-center overflow-y-auto">
        <ContactListItem />
        <hr className="border-t-[.1rem] border-solid" />
        <ContactListItem />
        <hr className="border-t-[.1rem] border-solid" />
        <ContactListItem />
        <hr className="border-t-[.1rem] border-solid" />
        <ContactListItem />
        <hr className="border-t-[.1rem] border-solid" />
        <ContactListItem />
        <hr className="border-t-[.1rem] border-solid" />
        <ContactListItem />
        <hr className="border-t-[.1rem] border-solid" />
        <ContactListItem />
        <a className="link pb-4" href="www.google.com">
          Load More
        </a>
      </div>
    </div>
  );
}

export default ContactList;
