import React, { useState } from 'react'
import axios from 'axios';
import styles from "../styles/styles.module.css";
import lsStyles from "./LogSignForm.module.css";

const SignupForm = ( {userType = 'estudante', closeForm, login} ) => {
  

  const [signupValues, setSignupValues] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmaSenha: ''
  })

  const handleInput = (e) => {
    setSignupValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const [error, setError] = useState();


  const handleSignup = (e) => {
    e.preventDefault();
    console.log(signupValues);
    setError();

    if( signupValues.senha === signupValues.confirmaSenha ) {
      let userData = {
        nome: signupValues.nome,
        email: signupValues.email,
        senha: signupValues.senha,
        tipo: userType
      };

      axios.post('http://localhost:3000/signup', userData)
      .catch(err => {
        console.log(err);
        if(err.response.status == 400) {
          setError("Email já cadastrado!")
        }
      })
      .then(res => {
        console.log(res);
        login();
      })
    } else {
      setError("As senhas devem ser iguais!")
    }

  }
  
  return (
    <div className={lsStyles.overlay}>
      <form id='signupform' onSubmit={handleSignup}>
        <div className={lsStyles.formTitle}>
          Inscreva-se
          <p className={lsStyles.formLegend}>
            Torne-se um {userType}!
          </p>
        </div>
        {error && <div className={lsStyles.error}>{error}</div>}
        <label>
          Nome:
          <input required name='nome' type='text' placeholder='Nome Exemplo' onChange={handleInput} />
        </label>
        
        <label>
          Email:
          <input required name='email' type='email' placeholder='email@exemplo.com' onChange={handleInput} />
        </label>

        <label>
          Senha:
          <input required name='senha' type='password' placeholder='******' onChange={handleInput} />
        </label>

        <label>
          Confirma senha:
          <input required name='confirmaSenha' type='password' placeholder='******' onChange={handleInput} />
        </label>

        <button type='submit' className={styles.btn}>Cadastrar</button>
        <button onClick={() => closeForm()} className={styles.btnSecondary}>Cancelar</button>
      </form>
    </div>
  )
}

export default SignupForm