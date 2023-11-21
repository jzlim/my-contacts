function ContactListItem() {
  return (
    <div className="flex flex-row items-center p-6 w-full gap-4 hover:cursor-pointer hover:bg-base-300">
      <div className="avatar">
        <div className="w-12 lg:w-20 rounded-full">
          <img
            src="https://rickandmortyapi.com/api/character/avatar/566.jpeg"
            alt="profile pic"
          />
        </div>
      </div>
      <div className="w-[70%] flex flex-col gap-1">
        <span className="text-sm lg:text-md">Character Name</span>
        <span className="text-sm lg:text-md">Species</span>
      </div>
    </div>
  );
}

export default ContactListItem;
