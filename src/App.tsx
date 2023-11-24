import { Outlet } from "react-router-dom";
import Nav from "./Nav/Nav";

const App = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="flex-none h-[10%] lg:h-full w-full lg:w-[15%] border-solid border-b-[.1rem] lg:border-r-[.1rem] border-b-white lg:border-r-white">
        <Nav />
      </div>
      <Outlet />
    </div>
  );
};

export default App;
