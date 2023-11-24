import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Contact from "./ContactWrapper/Contact/Contact";
import ContactWrapper from "./ContactWrapper/ContactWrapper";
import "./index.css";
import ErrorPage from "./shared/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contact",
        element: <ContactWrapper />,
        children: [
          {
            path: ":id",
            element: <Contact />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
