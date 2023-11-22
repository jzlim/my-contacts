import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDataFromApi } from "../../Api";
import ContactListItem from "./ContactListItem/ContactListItem";
import Filter from "./Filter/Filter";

function ContactList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [maxNumberOfPage, setMaxNumberOfPage] = useState(1);
  const [items, setItems] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const generateURLWithPayloads = (
    page,
    name = undefined,
    gender = undefined,
    status = undefined
  ) => {
    let url = "https://rickandmortyapi.com/api/character";
    url = `${url}?page=${encodeURIComponent(page)}`;
    if (name) {
      url += `&name=${encodeURIComponent(name)}`;
    }
    if (gender) {
      url += `&gender=${encodeURIComponent(gender)}`;
    }
    if (status) {
      url += `&status=${encodeURIComponent(status)}`;
    }
    return url;
  };

  const fetchData = (
    page = 1,
    isInitialFilter = false,
    name = undefined,
    gender = undefined,
    status = undefined
  ) => {
    const url = generateURLWithPayloads(page, name, gender, status);
    const fetchRequest = getDataFromApi(url);
    fetchRequest.then((result) => {
      if (result.results) {
        setItems((prevItems) => {
          if (isInitialFilter) {
            return result.results;
          } else {
            return [...prevItems, ...result.results];
          }
        });
      } else {
        setItems([]);
      }
      if (result.info) {
        setMaxNumberOfPage(result.info.pages);
      }
    });
  };

  const loadMore = () => {
    if (currentPage + 1 <= maxNumberOfPage) {
      fetchData(currentPage + 1, false, filterName, filterGender, filterStatus);
      setCurrentPage((value) => (value += 1));
    }
  };

  const updateFilter = (filterType, value) => {
    switch (filterType) {
      case "name":
        setFilterName(value);
        fetchData(1, true, value, filterGender, filterStatus);
        resetCurrentPage();
        break;
      case "gender":
        setFilterGender(value);
        fetchData(1, true, filterName, value, filterStatus);
        resetCurrentPage();
        break;
      case "status":
        setFilterStatus(value);
        fetchData(1, true, filterName, filterGender, value);
        resetCurrentPage();
        break;
      default:
        // setFilterName(""); // requirement asked to clear only `status` and `gender` values
        setFilterGender("");
        setFilterStatus("");
        fetchData(1, true, filterName);
        resetCurrentPage();
        break;
    }
  };

  const resetCurrentPage = () => setCurrentPage(1);

  const handleContactClick = (id) => {
    navigate(`/contact/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <span className="block text-xl lg:text-4xl mb-2 lg:mb-4">Contact</span>
        <Filter
          searchKeywordChange={(value) => updateFilter("name", value)}
          statusChange={(value) => updateFilter("status", value)}
          genderChange={(value) => updateFilter("gender", value)}
          clearFilter={() => updateFilter()}
        />
      </div>
      <div className="divider m-0"></div>
      <div className="flex flex-col items-center overflow-y-auto">
        {items.map((item, index) => (
          <ContactListItem
            key={index}
            profilePic={item.image}
            name={item.name}
            species={item.species}
            contactListClick={() => handleContactClick(item.id)}
          />
        ))}
        {currentPage + 1 <= maxNumberOfPage && (
          <button className="link pb-4" onClick={loadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default ContactList;
