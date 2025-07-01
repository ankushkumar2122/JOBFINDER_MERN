import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/ui/Jobs";
import About from "./components/ui/About";
import Contact from "./components/ui/Contact";
import Browse from "./components/ui/Browse";
import Profile from "./components/ui/Profile";
import JobDescription from "./components/ui/JobDescription";


function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/jobs",
      element: <Jobs />,
    },
    {
      path: "/description/:id",
      element: <JobDescription />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
