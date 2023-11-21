import PersonalInfo from "./PersonalInfo/PersonalInfo";
import Episode from "./Episode/Episode";

function Contact() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="flex flex-row items-center p-4 lg:p-6 w-full gap-8">
        <div className="avatar indicator">
          <span className="indicator-item indicator-top indicator-end badge badge-success"></span>
          <div className="w-28 lg:w-48 rounded-full">
            <img
              src="https://rickandmortyapi.com/api/character/avatar/566.jpeg"
              alt="profile pic"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-lg lg:text-4xl">Character Name</span>
        </div>
      </div>
      <hr className="border-t-[.1rem] border-solid" />
      <div className="flex flex-col p-4 lg:p-6 gap-6 lg:gap-8">
        <PersonalInfo />
        <Episode />
      </div>
    </div>
  );
}

export default Contact;
