import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCharacters } from "../../shared/Api/Api";
import Loading from "../../shared/Loading/Loading";
import { Character } from "../../types";
import ContactListItem from "./ContactListItem/ContactListItem";
import Filter from "./Filter/Filter";

type PageObject = {
  currentPage: number;
  nextPage: number | undefined;
  maxPage: number | undefined;
};

type FilterObject = {
  name: string | undefined;
  gender: string | undefined;
  status: string | undefined;
};

type Response = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: [Character];
};

const ContactList = () => {
  const navigate = useNavigate();
  const sentinelRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [pageObj, setPageObj] = useState<PageObject>({
    currentPage: 0,
    nextPage: 1,
    maxPage: undefined,
  });
  const [filterObject, setFilterObject] = useState<FilterObject>({
    name: "",
    gender: "",
    status: "",
  });
  const [isFilter, setIsFilter] = useState(false);
  const [items, setItems] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [intersectionHandled, setIntersectionHandled] = useState(false);
  const [isIntersected, setIsIntersected] = useState(false);

  const fetchData = async (resetPagination = false) => {
    if (!pageObj.nextPage && !resetPagination) {
      return;
    }
    if (pageObj.nextPage === undefined) {
      return;
    }
    try {
      setErrorMessage(() => "");
      setIsLoading(() => true);
      const requestResult: Response = await getCharacters(
        resetPagination ? 1 : pageObj.nextPage,
        filterObject.name,
        filterObject.gender,
        filterObject.status
      );
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
    } catch (error: unknown) {
      setErrorMessage(() => (error as Error).message);
      setItems([]);
    } finally {
      setIsLoading(() => false);
    }
  };

  const applyFilter = (
    filterType?: "name" | "gender" | "status",
    value?: string | undefined
  ) => {
    // scroll to most top to prevent the Intersection triggered when it's only performing filtering action
    if (scrollContainerRef && scrollContainerRef.current) {
      (scrollContainerRef.current as HTMLElement).scrollTop = 0;
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
          // newFilterObject.name = ""; // requirement asked to clear only `status` and `gender` values
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

    if (sentinelRef?.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [intersectionHandled]);

  const intersectionObserverHandler = (
    entries: IntersectionObserverEntry[]
  ) => {
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

  const handleContactClick = (id: string) => navigate(`/contact/${id}`);

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
        {items && items.length && !errorMessage ? (
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
          <span className="m-8 font-medium">
            {errorMessage || "No Contact Data"}
          </span>
        )}
        <div ref={sentinelRef}></div>
        {/* Empty <span> block is necessary here, otherwise the sentinelRef observer won't be triggered. */}
        <span className="inline-block min-h-[.25rem] w-full"></span>
      </div>
    </div>
  );
};

export default ContactList;
