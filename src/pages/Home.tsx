import React from "react";
import NavBar from "../components/NavBar";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Witamy w Kasynie</h1>
      <NavBar />
    </div>
  );
};

export default Home;
