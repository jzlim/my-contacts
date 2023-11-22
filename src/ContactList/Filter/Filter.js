import { useState } from "react";

function Filter({
  searchKeywordChange,
  statusChange,
  genderChange,
  clearFilter,
}) {
  const statusList = ["alive", "dead", "unknown"];
  const genderList = ["female", "male", "genderless", "unknown"];

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("DEFAULT");
  const [gender, setGender] = useState("DEFAULT");

  const handleStatusDropdown = (event) => {
    const value = event.target.value;
    setStatus(value);
    statusChange(value === "DEFAULT" ? undefined : value);
  };

  const handleGenderDropdown = (event) => {
    const value = event.target.value;
    setGender(value);
    genderChange(value === "DEFAULT" ? undefined : value);
  };

  const handleSearchKeywordInput = (event) => {
    const value = event.target.value;
    setKeyword(value);
    searchKeywordChange(value);
  };

  const handleClearFilter = () => {
    resetFilter();
    clearFilter();
  };

  const resetFilter = () => {
    setKeyword("");
    setStatus("DEFAULT");
    setGender("DEFAULT");
  };

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
        <div className="ml-auto tooltip" data-tip="Clear Filter">
          <button className="btn btn-xs btn-circle" onClick={handleClearFilter}>
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
      </div>
    </div>
  );
}

export default Filter;
