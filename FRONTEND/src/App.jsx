import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import "./App.css";

// Pages
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/ui/Jobs";
import About from "./components/ui/About";
import Contact from "./components/ui/Contact";
import Browse from "./components/ui/Browse";
import Profile from "./components/ui/Profile";
import JobDescription from "./components/ui/JobDescription";
import Companies from "./components/admin/Companies";

// Constants & Redux
import { USER_API_END_POINT } from "./utils/Constant";
import { SetUser } from "./redux/authslice";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";

function App() {
  const dispatch = useDispatch();

  // ✅ Auto fetch user on app load if cookie token exists
  useEffect(() => {
    console.log("✅ BASE_URL:", import.meta.env.VITE_API_BASE_URL);

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/me`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(SetUser(res.data.user));
        }
      } catch (err) {
        console.log(
          "No active session or error fetching user:",
          err?.response?.data?.message
        );
      }
    };

    fetchUser();
  }, [dispatch]);

  const appRouter = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/jobs", element: <Jobs /> },
    { path: "/description/:id", element: <JobDescription /> },
    { path: "/browse", element: <Browse /> },
    { path: "/about", element: <About /> },
    { path: "/contact", element: <Contact /> },
    { path: "/profile", element: <Profile /> },
    //adimin ke liya
    { path: "/admin/companies", element: <Companies /> },
     { path: "/admin/companies/create", element: <CompanyCreate /> },
     { path: "/admin/companies/:id", element: <CompanySetup /> },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
