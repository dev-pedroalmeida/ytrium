import React, { useState } from 'react'
import axios from 'axios';

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
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err);
        if(err.response.status == 400) {
          setError("Email já cadastrado!")
        }
      })
      .finally(login())
    } else {
      setError("As senhas devem ser iguais!")
    }

  }
  
  return (
    <div>
      Inscreva-se como um { userType }

      {error && <div className='error'>{error}</div>}

      <form id='signupform' onSubmit={handleSignup}>
        <label>
          Nome:
          <input name='nome' type='text' placeholder='Nome Exemplo' onChange={handleInput} />
        </label>
        
        <label>
          Email:
          <input name='email' type='email' placeholder='email@exemplo.com' onChange={handleInput} />
        </label>

        <label>
          Senha:
          <input name='senha' type='password' placeholder='******' onChange={handleInput} />
        </label>

        <label>
          Confirma senha:
          <input name='confirmaSenha' type='password' placeholder='******' onChange={handleInput} />
        </label>

        <button type='submit'>Cadastrar</button>
      </form>

      <button onClick={() => closeForm()}>Cancelar</button>
    </div>
  )
}

export default SignupForm