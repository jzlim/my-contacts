import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./Nav/Nav";
import ContactList from "./ContactList/ContactList";
import Contact from "./Contact/Contact";

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
      <div className="flex flex-col lg:flex-row h-screen">
        <div className="flex-none h-[10%] lg:h-full w-full lg:w-[15%] border-solid border-b-[.1rem] lg:border-r-[.1rem] border-b-white lg:border-r-white">
          <Nav />
        </div>
        <div className="flex h-[90%] lg:h-full w-full lg:w-[85%]">
          <div className="w-[30%] border-solid border-r-[.1rem] border-r-white">
            <ContactList />
          </div>
          <div className="w-[70%]">
            <Contact />
          </div>
        </div>
        {/* <div>
          count: {pageInfo.count}; <br /> next: {pageInfo.next}; <br /> pages:
          {pageInfo.pages}; <br /> prev: {pageInfo.prev}
        </div>
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
        <button className="btn btn-neutral" onClick={loadMore}>
          Load More
        </button> */}
      </div>
    );
  }
}

export default App;
