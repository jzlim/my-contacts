import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getDataFromApi } from "../../../Shared/Api";
import Loading from "../../../Shared/Loading/Loading";

function Episode({ episodeUrls }) {
  const regex = /\/(\d+)$/;
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (paramIds) => {
    const url = `https://rickandmortyapi.com/api/episode/[${encodeURIComponent(
      paramIds
    )}]`;

    try {
      setIsLoading(() => true);
      const requestResult = await getDataFromApi(url);
      if (requestResult) {
        setEpisodes(requestResult ?? []);
      }
      // TODO: if the character data is invalid, show alter page
    } catch (error) {
      console.log("Episode catchError", error);
      // TODO: handle error
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
                    No Episodes Data
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
