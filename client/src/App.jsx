import "./App.css";
import { AuthContext } from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {

    if(user?.tipo == 'estudante') navigate('/student');

    if(user?.tipo == 'instrutor') navigate('/instructor');

    if(user?.tipo == 'admin') navigate('/admin');

    if(user == null) navigate('/landing');

  }, [ user ])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {
        user?.tipo 
          &&
        <Navbar userType={user?.tipo} />
      }
      
      <Outlet />
    </AuthContext.Provider>
  );
}

export default App;
