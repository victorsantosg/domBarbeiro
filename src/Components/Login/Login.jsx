import React from 'react'
import './Login.css'
import '../../App.css'
import { Link } from 'react-router-dom'
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

const Login = () => {
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
              <input type='text' id='username' placeholder='Enter Username' />
            </div> 
          </div>


          <div className="inputDiv">
            <label htmlFor='password'>Senha</label>
            <div className="input flex">
              <BsFillShieldLockFill className="icon" />
              <input type='password' id='password' placeholder='Sua senha'/>
            </div> 
          </div>

          <button type='submit' className='btn flex'>
            <span>Login </span>
            <BiArrowToRight className="icon" />
          </button>

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