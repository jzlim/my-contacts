function Filter() {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Search Characters"
        className="input input-bordered w-full max-w-xs input-sm lg:input-md"
      />
      <div className="meta-filters flex flex-row gap-2">
        <div>
          <select className="select select-bordered select-xs w-full max-w-xs">
            <option disabled selected>
              Status
            </option>
            <option>Alive</option>
            <option>Dead</option>
            <option>Unknown</option>
          </select>
        </div>
        <div>
          <select className="select select-bordered select-xs w-full max-w-xs">
            <option disabled selected>
              Gender
            </option>
            <option>Male</option>
            <option>Female</option>
            <option>Unknown</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filter;
