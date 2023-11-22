import { useEffect, useState } from "react";
import { getDataFromApi } from "../../../Api";
import dayjs from "dayjs";

function Episode({ episodeUrls }) {
  const regex = /\/(\d+)$/;
  const [episodes, setEpisodes] = useState([]);

  const fetchData = (paramIds) => {
    const url = `https://rickandmortyapi.com/api/episode/[${encodeURIComponent(
      paramIds
    )}]`;
    const fetchRequest = getDataFromApi(url);
    fetchRequest.then((result) => {
      if (result) {
        setEpisodes(result ?? []);
      }
    });
  };

  useEffect(() => {
    // get episodes' id from given string
    if (episodeUrls?.length) {
      const episodeIds = episodeUrls.map((url) => {
        const match = url.match(regex);
        return match ? parseInt(match[1]) : null;
      });
      console.log("episodeIds", episodeIds);
      fetchData(episodeIds.join(", "));
    }
  }, [episodeUrls]);

  if (episodes) {
    return (
      <div>
        <span className="block text-lg lg:text-3xl mb-4">Episodes</span>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Air Date</th>
                <th>Episode</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {episodes.map((episode) => (
                <tr className="hover">
                  <th>{episode.name}</th>
                  <td>{dayjs(episode.air_date).format("DD MMM YYYY")}</td>
                  <td>{episode.episode}</td>
                  <td>{dayjs(episode.created).format("DD MMM YYYY")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Episode;
