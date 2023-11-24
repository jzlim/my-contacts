import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDataFromApi } from "../../Shared/Api";
import Loading from "../../Shared/Loading/Loading";
import ContactListItem from "./ContactListItem/ContactListItem";
import Filter from "./Filter/Filter";

function ContactList() {
  // TODO:
  // 1. add loading state => contact list, single contact, episode table
  // 2. verify the feasibility of using Typescript
  // 3. verify all implementations and fix possible bad practice
  // 4. consider separate single file to consolidate API requests
  // 5. request error handling

  const navigate = useNavigate();
  const sentinelRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [pageObj, setPageObj] = useState({
    currentPage: 0,
    nextPage: 1,
    maxPage: undefined,
  });
  const [filterObject, setFilterObject] = useState({
    name: "",
    gender: "",
    status: "",
  });
  const [isFilter, setIsFilter] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [intersectionHandled, setIntersectionHandled] = useState(false);
  const [isIntersected, setIsIntersected] = useState(false);

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

  const fetchData = async (resetPagination = false) => {
    if (!pageObj.nextPage && !resetPagination) {
      return;
    }
    const url = generateURLWithPayloads(
      resetPagination ? 1 : pageObj.nextPage,
      filterObject.name,
      filterObject.gender,
      filterObject.status
    );
    try {
      setIsLoading(() => true);
      const requestResult = await getDataFromApi(url);
      if (requestResult) {
        if (requestResult.results) {
          setItems((currentItems) => {
            if (resetPagination) {
              return [...requestResult.results];
            }
            return [...currentItems, ...requestResult.results];
          });
        } else {
          setItems([]);
        }
        if (requestResult.info) {
          setPageObj((obj) => {
            const info = requestResult.info;
            const currentPage = obj.currentPage + 1;
            const nextPage = currentPage + 1;
            return {
              currentPage,
              nextPage: info.next != null ? nextPage : undefined,
              maxPage: requestResult.info.pages,
            };
          });
        }
      }
    } catch (error) {
      console.log("ContactList catchError", error);
      // TODO: handle error
    } finally {
      setIsLoading(() => false);
    }
  };

  const applyFilter = (filterType, value) => {
    // scroll to most top to prevent the Intersection triggered when it's only performing filtering action
    if (scrollContainerRef && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }

    setFilterObject((obj) => {
      let newFilterObject = { ...obj };
      switch (filterType) {
        case "name":
          newFilterObject.name = value;
          break;
        case "gender":
          newFilterObject.gender = value;
          break;
        case "status":
          newFilterObject.status = value;
          break;
        default:
          newFilterObject.name = ""; // requirement asked to clear only `status` and `gender` values
          newFilterObject.gender = "";
          newFilterObject.status = "";
          break;
      }
      return newFilterObject;
    });

    setPageObj(() => {
      return { currentPage: 0, nextPage: 1, maxPage: undefined };
    });

    setIsFilter(() => true);
  };

  useEffect(() => {
    if (isFilter) {
      fetchData(true);
      setIsFilter(() => false);
    } else if (isIntersected) {
      fetchData();
      setIsIntersected(() => false);
    }
  }, [filterObject, isFilter, isIntersected]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => intersectionObserverHandler(entries),
      { threshold: 1 }
    );

    observer.observe(sentinelRef.current);

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [intersectionHandled]);

  const intersectionObserverHandler = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      if (!intersectionHandled) {
        setIsIntersected(() => true);
        setIntersectionHandled(() => true); // set the flag to true to indicate the action has been taken
      }
    } else {
      setIntersectionHandled(() => false); // reset the flag when the target is not intersecting
    }
  };

  const handleContactClick = (id) => navigate(`/contact/${id}`);

  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <span className="block text-xl lg:text-4xl mb-2 lg:mb-4">Contact</span>
        <Filter
          searchKeywordChange={(value) => applyFilter("name", value)}
          statusChange={(value) => applyFilter("status", value)}
          genderChange={(value) => applyFilter("gender", value)}
          clearFilter={() => applyFilter()}
        />
      </div>
      <div className="divider m-0"></div>
      <div
        className="flex flex-col items-center overflow-y-auto"
        ref={scrollContainerRef}
      >
        {isLoading && <Loading asOverlay={true} />}
        {items && items.length ? (
          items.map((item, index) => (
            <ContactListItem
              key={index}
              profilePic={item.image}
              name={item.name}
              species={item.species}
              contactListClick={() => handleContactClick(item.id)}
            />
          ))
        ) : (
          <span className="m-8 font-medium">No Contact Data</span>
        )}
        <div ref={sentinelRef}></div>
        {/* Empty <span> block is necessary here, otherwise the sentinelRef observer won't be triggered. */}
        <span className="inline-block min-h-[.25rem] w-full"></span>
      </div>
    </div>
  );
}

export default ContactList;
