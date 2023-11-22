import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataFromApi } from "../../Api";
import Episode from "./Episode/Episode";
import PersonalInfo from "./PersonalInfo/PersonalInfo";

function Contact() {
  const { id } = useParams();
  const [character, setCharacter] = useState(undefined);

  const fetchData = () => {
    const url = `https://rickandmortyapi.com/api/character/${encodeURIComponent(
      id
    )}`;
    const fetchRequest = getDataFromApi(url);
    fetchRequest.then((result) => {
      if (result) {
        setCharacter({ ...result });
      } else {
        setCharacter(undefined);
      }
    });
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  if (character) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="flex flex-row items-center p-4 lg:p-6 w-full gap-8">
          <div className="avatar indicator">
            <div className="w-28 lg:w-48 rounded-full">
              <img src={character.image} alt="profile pic" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg lg:text-4xl">{character.name}</span>
          </div>
        </div>
        <hr className="border-t-[.1rem] border-solid" />
        <div className="flex flex-col p-4 lg:p-6 gap-6 lg:gap-8">
          <PersonalInfo character={character} />
          <Episode episodeUrls={character.episode} />
        </div>
      </div>
    );
  }
}

export default Contact;
