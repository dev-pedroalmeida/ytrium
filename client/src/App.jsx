import "./App.css";
import { AuthContext } from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.tipo == "estudante") navigate("/student");

    if (user?.tipo == "instrutor") navigate("/instructor");

    if (user?.tipo == "admin") navigate("/admin");

    if (user == null) {
      axios
        .get("http://localhost:3000/", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          if (res.data.auth == 1) {
            setUser(res.data.user);
          } else {
            navigate("/landing");
          }
        });
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="h-screen w-screen absolute top-0 right-0 -z-10 overflow-hidden bg-amber-50">
        {/* <div className="w-[300px] h-[300px] bg-amber-400/40 blur-[100px] rounded-full absolute top-[80px] right-[200px]"></div>
        <div className="w-[400px] h-[400px] bg-orange-400/30 blur-[100px] rounded-full absolute top-[100px] right-[400px]"></div> */}
      </div>
      <div className="min-h-[107vh] flex flex-col">
        <div className="flex-1">
          {user?.tipo && <Navbar userType={user?.tipo} />}

          <Outlet />
          
        </div>

        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
