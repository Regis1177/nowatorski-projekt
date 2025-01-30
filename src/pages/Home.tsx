import React from "react";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Witamy w Kasynie!</h1>
      <p>
        Wybierz jedną z gier z menu nawigacyjnego powyżej, aby rozpocząć zabawę.
      </p>
    </div>
  );
};

export default Home;
