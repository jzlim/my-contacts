import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    count: 0,
    pages: undefined,
    prev: null,
    next: "https://rickandmortyapi.com/api/character?page=1",
  });

  const fetchData = async () => {
    fetch(pageInfo.next)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.results) {
            setItems([...items, ...result.results]);
          } else {
            setItems([]);
          }
          if (result.info) {
            setPageInfo({ ...result.info });
          } else {
            setPageInfo({
              count: 0,
              next: "https://rickandmortyapi.com/api/character?page=1",
              pages: undefined,
              prev: null,
            });
          }
          console.log(result.results);
        },
        (error) => {
          setError(error);
        }
      );
  };

  const loadMore = async () => {
    if (pageInfo.next) {
      fetchData(pageInfo.next);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div>
        <div>
          count: {pageInfo.count}; <br /> next: {pageInfo.next}; <br /> pages:{" "}
          {pageInfo.pages}; <br /> prev: {pageInfo.prev}
        </div>
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
        <button className="btn btn-neutral" onClick={loadMore}>
          Load More
        </button>
      </div>
    );
  }
}

export default App;
