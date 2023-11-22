import { useState } from "react";
import "./App.css";
import Contact from "./Contact/Contact";
import ContactList from "./ContactList/ContactList";
import Nav from "./Nav/Nav";

function App() {
  const [selectedContactId, setSelectedContactId] = useState(undefined);
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="flex-none h-[10%] lg:h-full w-full lg:w-[15%] border-solid border-b-[.1rem] lg:border-r-[.1rem] border-b-white lg:border-r-white">
        <Nav />
      </div>
      <div className="flex h-[90%] lg:h-full w-full lg:w-[85%]">
        <div className="w-[30%] border-solid border-r-[.1rem] border-r-white">
          <ContactList contactClick={(id) => setSelectedContactId(id)} />
        </div>
        <div className="w-[70%]">
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default App;
