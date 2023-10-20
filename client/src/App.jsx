import "./App.css";
import { AuthContext } from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {

    if(user?.tipo == 'estudante') navigate('/courses');

    if(user?.tipo == 'instrutor') navigate('/instrutor');

    if(user?.tipo == 'admin') navigate('/admin');

    if(user == null) navigate('/landing');

  }, [ user ])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <button onClick={() => {
        console.log(user)
      }}>Eoq</button>
      <Outlet />
    </AuthContext.Provider>
  );
}

export default App;
