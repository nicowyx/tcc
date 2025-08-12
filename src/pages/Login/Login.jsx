import React, { useState } from 'react';
import '../Login/Login.css';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';


function Login() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="Login">
      <div className={`container ${isActive ? 'active' : ''}`} id="container">
        <div className="form-container sign-up">
          <form>
            <h1>Crie sua Conta</h1>
            <div className="social-icons">
              <a href="#" className="icon"><FaGooglePlusG /></a>
              <a href="#" className="icon"><FaFacebookF /></a>
              <a href="#" className="icon"><FaGithub /></a>
              <a href="#" className="icon"><FaLinkedinIn /></a>
            </div>
            <span>ou use seu e-mail para se registrar</span>
            <input type="text" placeholder="Nome" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Senha" />
            <Link className="button">Registrar</Link>
          </form>
        </div>

        <div className="form-container sign-in">
          <form>
            <h1>Entre</h1>
            <div className="social-icons">
              <a href="#" className="icon"><FaGooglePlusG /></a>
              <a href="#" className="icon"><FaFacebookF /></a>
              <a href="#" className="icon"><FaGithub /></a>
              <a href="#" className="icon"><FaLinkedinIn /></a>
            </div>
            <span>ou use seu e-mail e senha</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Senha" />
            <a href="#">Esqueceu sua senha?</a>
            <Link to="/home" className='button' >Entrar</Link>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Bem vindo de volta!</h1>
              <p>Insira seus dados pessoais para usar todos os recursos do site</p>
              <button className="hidden button" onClick={() => setIsActive(false)}>Entrar</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Olá, Amigo!</h1>
              <p>Registre seus dados pessoais para usar todos os recursos do site</p>
              <button className="hidden button" onClick={() => setIsActive(true)}>Registrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
