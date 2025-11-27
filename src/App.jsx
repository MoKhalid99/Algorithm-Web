import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import AboutMe from "./components/AboutMe/AboutMe";
import ExtraCourses from "./components/ExtraCourses/ExtraCourses";
import CollageCourses from "./components/collageCourses/collageCourses";
import ContactUs from "./components/ContactUs/ContactUs";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Error from "./components/Error/Error";
import StudentMaterial from "./components/StudentMaterial/StudentMaterial";
import Main from "./components/Main/Main";
import AuthContextProvider from "./components/Context/Context";
import Chatting from './components/Chatting/Chatting';
import Level01 from './components/Level01/Level01';
import Level02 from './components/Level02/Level02';
import Games from "./components/Games/Games";

const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "Main",
        element: <Main />,
      },
      {
        path: "CollageCourses",
        element: <CollageCourses />,
      },
      {
        path: "ExtraCourses",
        element: <ExtraCourses />,
      },
      {
        path: "StudentMaterial",
        element: <StudentMaterial />,
      },
      {
        path: "Chatting",
        element: <Chatting />,
      },
      {
        path: "AboutMe",
        element: <AboutMe />,
      },
      {
        path: "ContactUs",
        element: <ContactUs />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Register",
        element: <Register />,
      },
      {
        path: "Level01",
        element: <Level01 />,
      },
      {
        path: "Level02",
        element: <Level02 />,
      },
      {
        path: "Games",
        element: <Games />,
      },
      { path: "*", element: <Error /> },
    ],
  },
]);
export default function App() {
  return (
    <>
      <AuthContextProvider>
        <div className="">
          <RouterProvider router={routes} />
        </div>
      </AuthContextProvider>
    </>
  );
}
