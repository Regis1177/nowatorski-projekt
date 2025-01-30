import React from "react";
import NavBar from "../components/NavBar";

const Home: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Witamy w kasynie!</h1>
      <NavBar />
    </div>
  );
};

export default Home;
