import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataFromApi } from "../../Shared/Api";
import Loading from "../../Shared/Loading/Loading";
import Episode from "./Episode/Episode";
import PersonalInfo from "./PersonalInfo/PersonalInfo";

function Contact() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    const url = `https://rickandmortyapi.com/api/character/${encodeURIComponent(
      id
    )}`;
    try {
      setErrorMessage(() => "");
      setIsLoading(() => true);
      const requestResult = await getDataFromApi(url);
      if (requestResult) {
        setCharacter(() => requestResult || null);
      }
    } catch (error) {
      setErrorMessage(() => error.message);
      setCharacter(() => null);
    } finally {
      setIsLoading(() => false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="relative h-full overflow-y-auto">
      {isLoading ? (
        <Loading />
      ) : character !== null ? (
        <>
          <div className="flex flex-row items-center p-4 lg:p-6 w-full gap-8">
            <div className="avatar indicator">
              <div className="w-28 lg:w-48 rounded-full">
                <img src={character?.image} alt="profile pic" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg lg:text-4xl">{character?.name}</span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col p-4 lg:p-6 gap-6 lg:gap-8">
            <PersonalInfo character={character} />
            <Episode episodeUrls={character?.episode} />
          </div>
        </>
      ) : (
        <div className="absolute flex h-full w-full justify-center items-center">
          <span className="font-medium">
            {errorMessage || "No Character Found"}
          </span>
        </div>
      )}
    </div>
  );
}

export default Contact;
