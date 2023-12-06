import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx'
import pStyles from './ProfileIcon.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileIcon = () => {

  const [open, setOpen] = useState(false);
  const { user, setUser} = useContext(AuthContext);

  const navigate = useNavigate();

  function handleProfile() {
    if(user.tipo == 'estudante') {
      navigate('/student/profile');
    }
  }

  function handleLogout() {
    axios.get('http://localhost:3000/logout', {
      withCredentials: true,
    })
    .catch(err => {
      console.log(err);
    })
    .then(res => {
      setUser({});
      navigate('/landing');
    })
  }

  return (
    <div className={pStyles.profile} onClick={() => setOpen(!open)}>
      <div className={pStyles.profileIcon}></div>

      { open && 
        <div className={pStyles.dropdown}>

          <div className={pStyles.info}>
            <div className={pStyles.infoName}>
              {user?.nome}
            </div>
            <div className={pStyles.infoEmail}>
              {user?.email}
            </div>
          </div>
    
          <div className={pStyles.dropItem} onClick={() => handleProfile()}>Perfil</div>
    
          <div className={pStyles.dropItem} onClick={() => handleLogout()}>Sair</div>
        </div>
      }
    </div>
  )
}

export default ProfileIcon