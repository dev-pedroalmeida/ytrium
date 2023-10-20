import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ closeForm }) => {

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginValues, setLoginValues] = useState({
    email: '',
    senha: ''
  })

  const handleInput = (e) => {
    setLoginValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const [error, setError] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(loginValues);
    setError();

    if( loginValues.email !== null && loginValues.senha !== null ) {
      
      axios.post('http://localhost:3000/login', loginValues)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err);
        if(err.response.status == 400) {
          setError("Email ou senha inválidos!")
        }
      })
      .finally(
        
      )
    } else {
      setError("Preencha todos os campos!")
    }

  }

  return (
    <div>
      Login

      {error && <div className='error'>{error}</div>}
      
      <form id='loginform' onSubmit={handleLogin}>
        <label>
          Email:
          <input name='email' type='email' placeholder='email@exemplo.com' onChange={handleInput} />
        </label>

        <label>
          Senha:
          <input name='senha' type='password' placeholder='******' onChange={handleInput} />
        </label>

        <button type='submit'>Cadastrar</button>
      </form>

      <button onClick={() => closeForm()}>Cancelar</button>
    </div>
  );
};

export default LoginForm;
