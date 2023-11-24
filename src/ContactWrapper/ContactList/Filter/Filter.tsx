import { ChangeEvent, useEffect, useRef, useState } from "react";

type Props = {
  searchKeywordChange: (value: string | undefined) => void;
  statusChange: (value: string | undefined) => void;
  genderChange: (value: string | undefined) => void;
  clearFilter: () => void;
};

const Filter = ({
  searchKeywordChange,
  statusChange,
  genderChange,
  clearFilter,
}: Props) => {
  const statusList = ["alive", "dead", "unknown"];
  const genderList = ["female", "male", "genderless", "unknown"];

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("DEFAULT");
  const [gender, setGender] = useState("DEFAULT");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  const isInitialRender = useRef(true);

  const handleStatusDropdown = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setStatus(() => value);
    statusChange(value === "DEFAULT" ? undefined : value);
  };

  const handleGenderDropdown = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setGender(() => value);
    genderChange(value === "DEFAULT" ? undefined : value);
  };

  const handleSearchKeywordInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKeyword(() => value);
  };

  const handleClearFilter = () => {
    resetFilter();
    clearFilter();
  };

  const resetFilter = () => {
    // setKeyword(""); // requirement asked to clear only `status` and `gender` values
    setStatus("DEFAULT");
    setGender("DEFAULT");
  };

  useEffect(() => {
    // skip the debounce on the initial render
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    } else {
      searchKeywordChange(debouncedInputValue);
    }
  }, [debouncedInputValue]);

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(keyword);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [keyword]);

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Search Characters"
        className="input input-bordered w-full max-w-xs input-sm lg:input-md"
        value={keyword}
        onChange={handleSearchKeywordInput}
      />
      <div className="meta-filters flex flex-row gap-2">
        <div>
          <select
            className="select select-bordered select-xs w-full max-w-xs"
            value={status}
            onChange={handleStatusDropdown}
          >
            <option value="DEFAULT">All Status</option>
            {statusList.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="select select-bordered select-xs w-full max-w-xs"
            value={gender}
            onChange={handleGenderDropdown}
          >
            <option value="DEFAULT">All Gender</option>
            {genderList.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {(keyword ||
          (status && status !== "DEFAULT") ||
          (gender && gender !== "DEFAULT")) && (
          <div className="ml-auto tooltip" data-tip="Clear Filter">
            <button
              className="btn btn-xs btn-circle"
              onClick={handleClearFilter}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
