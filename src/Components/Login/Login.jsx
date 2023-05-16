import React, { useState } from 'react'
import './Login.css'
import '../../App.css'
import { Link } from 'react-router-dom'
import LoginAcess from '../../utils/LoginAcess'
//import { supabase } from '../../supabaseClient'

// Assets
import video from '../../LoginAssets/video.mp4'
import logo from '../../LoginAssets/logo.png'

// Icons
import {FaUserShield} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
import {BiArrowToRight} from 'react-icons/bi'

/*const LoginGitHub = async () =>{
  await supabase.auth.signIn({

  })
};*/


function Login() {

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');


  function handleSubmit(event) {
      event.preventDefault();
      const data = {
          login,
          senha
      }
      if (data.login === LoginAcess.login && data.senha === LoginAcess.senha) {
          alert(`Access Permitido! Seja bem vindo ` + LoginAcess.nome);
          window.location.href = '/agendamentos';
      } else {
          alert("Access Negado, tente novamente ou crie outra conta")
      }
  }

  function settarLogin(event) {
      setLogin(event.target.value);
    }

  function settarSenha(event) {
      setSenha(event.target.value);
  }



  return (
    <div className='loginPage flex'>
    <div className='container flex'> 


      <div className="videoDiv">
        <video src={video} autoPlay muted loop></video>
        
        <div className="textDiv">
          <h2 className='title'>Faça parte do nosso time</h2>
          <p>Estamos te esperando!</p>
        </div>

        <div className="footerDiv flex">
          <span className='text'>Não tem uma conta?</span>
          <Link to={'/register'}>
          <button className='btn'>Criar Conta</button>
          </Link>
      </div>
      </div>

      <div className="formDiv flex">
        <div className="headerDiv">
          <img src={logo} alt="Logo IMG" />
          <h3>Bem vindo de volta!</h3>
        </div>

        <form action='' className='form grid'>
          <span></span> 
          <div className="inputDiv">
            <label htmlFor='username'>Usuário</label>
            <div className="input flex">
              <FaUserShield className="icon" />
              <input type='email' id='email' placeholder='Enter Username'  value={login} onChange={settarLogin}/>
            </div> 
          </div>


          <div className="inputDiv">
            <label htmlFor='password'>Senha</label>
            <div className="input flex">
              <BsFillShieldLockFill className="icon" />
              <input type='password' id='password' placeholder='Sua senha'  value={senha} onChange={settarSenha}/>
            </div> 
          </div>

          <button type='submit' className='btn flex' onClick={handleSubmit}>
            <span>Login </span>
            <BiArrowToRight className="icon" />
          </button>
          <button>Github</button>

          <span className='forgotPassword'>
            Esqueceu sua senha? <a href='/'>Clique aqui</a>
          </span>
          

        </form>
      </div>


    </div>
    </div>
  )
  
}
export default Login