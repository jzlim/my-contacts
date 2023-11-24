type Props = {
  profilePic: string;
  name: string;
  species: string;
  contactListClick: () => void;
};

const ContactListItem = ({
  profilePic,
  name,
  species,
  contactListClick,
}: Props) => {
  return (
    <>
      <div
        className="flex flex-row items-center p-6 w-full gap-4 hover:cursor-pointer hover:bg-base-300"
        onClick={() => contactListClick()}
      >
        <div className="avatar">
          <div className="w-12 lg:w-20 rounded-full">
            <img src={profilePic} alt="profile pic" />
          </div>
        </div>
        <div className="w-[70%] flex flex-col gap-1">
          <span className="text-sm lg:text-md">{name}</span>
          <span className="text-sm lg:text-md">{species}</span>
        </div>
      </div>
      <div className="divider m-0"></div>
    </>
  );
};

export default ContactListItem;
