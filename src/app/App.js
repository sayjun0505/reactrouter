import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Layout from "../components/layout";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import PlantOffset from "../pages/plant_offset";
import Projects from "../pages/projects";
import GetInvolved from "../pages/get_involved";
import About from "../pages/about";
import Community from "../pages/community";
import Profile from "../pages/profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* {localStorage.getItem("token") && (<Route path='/login' element={<Navigate replace to="/" />} />)} */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/plant_offset" element={<PlantOffset />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/get_involved" element={<GetInvolved />} />
          <Route path="/about" element={<About />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}