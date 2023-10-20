import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav>
      <h1>ytrium</h1>
      <div>a</div>
    </nav>
  );
};

export default Navbar;
