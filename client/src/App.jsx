import "./App.css";
import { AuthContext } from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from './components/Navbar';
import axios from "axios";

function App() {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {

    if(user?.tipo == 'estudante') navigate('/student');

    if(user?.tipo == 'instrutor') navigate('/instructor');

    if(user?.tipo == 'admin') navigate('/admin');

    if(user == null) {

      axios.get('http://localhost:3000/',{
        withCredentials: true,
      })
      .then(res => {
        console.log(res);
        if(res.data.auth == 1) {
          setUser(res.data.user);
        } else {
          navigate('/landing');
        }
      })     
    } 

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
