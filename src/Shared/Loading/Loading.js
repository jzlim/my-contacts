const Loading = ({ asOverlay }) => {
  return (
    <div
      className={`flex absolute justify-center items-center top-0 left-0 h-full w-full ${
        asOverlay ? "bg-[#ffffffe6] z-10" : ""
      }`}
    >
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default Loading;
