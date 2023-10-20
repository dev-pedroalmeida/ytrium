import "./App.css";
import { AuthContext } from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  const unsetUser = () => {
    setUser({});
  };

  useEffect(() => {

    if (user?.id === undefined || user?.id === null) {
      navigate("/landing");
    }

  }, [ user ])

  return (
    <AuthContext.Provider value={{ user, setUser, unsetUser }}>
      <Outlet />
    </AuthContext.Provider>
  );
}

export default App;
