import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getDataFromApi } from "../../../Shared/Api";
import Loading from "../../../Shared/Loading/Loading";

function Episode({ episodeUrls }) {
  const regex = /\/(\d+)$/;
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async (paramIds) => {
    const url = `https://rickandmortyapi.com/api/episode/[${encodeURIComponent(
      paramIds
    )}]`;

    try {
      setErrorMessage(() => "");
      setIsLoading(() => true);
      const requestResult = await getDataFromApi(url);
      if (requestResult) {
        setEpisodes(requestResult ?? []);
      }
    } catch (error) {
      setErrorMessage(() => error.message);
      setEpisodes(() => []);
    } finally {
      setIsLoading(() => false);
    }
  };

  useEffect(() => {
    // get episodes' id from given string
    if (episodeUrls?.length) {
      const episodeIds = episodeUrls.map((url) => {
        const match = url.match(regex);
        return match ? parseInt(match[1]) : null;
      });
      fetchData(episodeIds.join(", "));
    }
  }, [episodeUrls]);

  if (episodes) {
    return (
      <div>
        <span className="block text-lg lg:text-3xl mb-4">Episodes</span>
        <div className="overflow-x-auto">
          <table className="table relative">
            <thead>
              <tr>
                <th>Name</th>
                <th>Air Date</th>
                <th>Episode</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="relative" colSpan={4}>
                    <br />
                    <Loading />
                  </td>
                </tr>
              ) : episodes && episodes?.length ? (
                episodes.map((episode) => (
                  <tr className="hover" key={episode.id}>
                    <th>{episode.name}</th>
                    <td>{dayjs(episode.air_date).format("DD MMM YYYY")}</td>
                    <td>{episode.episode}</td>
                    <td>{dayjs(episode.created).format("DD MMM YYYY")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center font-medium" colSpan={4}>
                    {errorMessage || "No Episodes Found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Episode;
