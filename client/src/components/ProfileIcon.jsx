import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import axios from "axios";
import { isRouteErrorResponse, useNavigate } from "react-router-dom";
import { UserRound, LogOut, UserCog2 } from "lucide-react";

const ProfileIcon = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser, setIsAuth } = useContext(AuthContext);
  const userRef = useRef()

  const navigate = useNavigate();

  function handleProfile() {
    if (user.tipo == "estudante") {
      navigate("/student/profile");
    }
  }

  function handleLogout() {
    axios
      .get("http://localhost:3000/logout", {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        setUser({});
        setIsAuth(false);
        navigate("/landing");
      });
  }

  document.addEventListener('click', (e) => {
    if(open && e.target !== userRef) setOpen(false)
  })

  return (
    <div
      className="flex items-center justify-center gap-2"
      onClick={(e) => {
        e.stopPropagation()
        setOpen(!open)}
      }
      ref={userRef}
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 cursor-pointer flex items-center justify-center">
        <UserRound size={24} color="white" />
      </div>

      {open && (
        <div className="min-w-[160px] absolute top-12 right-28 bg-white p-2 shadow-md rounded flex flex-col gap-2 z-50">
          <div className="py-2 px-1">
            <div className="font-semibold">{user?.nome}</div>
            <div className="text-xs text-zinc-800/80">{user?.email}</div>
          </div>

          <div
            className="rounded transition p-2 text-zinc-900/80 cursor-pointer hover:bg-orange-200 font-medium flex items-center gap-2"
            onClick={() => handleProfile()}
          >
            <UserCog2 size={18} />
            Perfil
          </div>

          <div
            className="rounded transition p-2 text-zinc-900/80 cursor-pointer hover:bg-orange-200 font-medium flex items-center gap-2"
            onClick={() => handleLogout()}
          >
            <LogOut size={18} />
            Sair
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
