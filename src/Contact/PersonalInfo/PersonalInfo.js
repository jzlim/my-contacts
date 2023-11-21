function PersonalInfo() {
  return (
    <div>
      <span className="block text-lg lg:text-3xl mb-4">Personal Info</span>
      <div className="grid grid-cols-3 gap-6">
        <div>
          <span className="block text-gray-400 text-xs lg:text-lg">
            Status:
          </span>
          <span className="text-sm lg:text-xl">Available</span>
        </div>
        <div>
          <span className="block text-gray-400 text-xs lg:text-lg">
            Gender:
          </span>
          <span className="text-sm lg:text-xl">Male</span>
        </div>
        <div>
          <span className="block text-gray-400 text-xs lg:text-lg">
            Species:
          </span>
          <span className="text-sm lg:text-xl">Unknown</span>
        </div>
        <div>
          <span className="block text-gray-400 text-xs lg:text-lg">
            Location:
          </span>
          <span className="text-sm lg:text-xl">Unknown</span>
        </div>
        <div>
          <span className="block text-gray-400 text-xs lg:text-lg">
            Origin:
          </span>
          <span className="text-sm lg:text-xl">Unknown</span>
        </div>
        <div>
          <span className="block text-gray-400 text-xs lg:text-lg">
            Created Date:
          </span>
          <span className="text-sm lg:text-xl">{new Date().toString()}</span>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
