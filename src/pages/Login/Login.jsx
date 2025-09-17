import React, { useState } from 'react';
import '../Login/Login.css';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../../services/api';


function Login() {
  const [isActive, setIsActive] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogin() {
    if (!loginData.email || !loginData.password) {
      setError('Preencha todos os campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await apiService.login(loginData.email, loginData.password);
      navigate('/home');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister() {
    if (!registerData.name || !registerData.email || !registerData.password) {
      setError('Preencha todos os campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await apiService.register(registerData.name, registerData.email, registerData.password);
      setError('');
      setIsActive(false);
      alert('Conta criada com sucesso! Faça login.');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="Login">
      <div style={{ background: '#fff', borderRadius: '10px', padding: '40px', width: '400px', textAlign: 'center' }}>
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => setIsActive(false)} 
            style={{ 
              padding: '10px 20px', 
              margin: '0 10px', 
              background: !isActive ? '#905cc0' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
          <button 
            onClick={() => setIsActive(true)} 
            style={{ 
              padding: '10px 20px', 
              margin: '0 10px', 
              background: isActive ? '#905cc0' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Registrar
          </button>
        </div>

        {!isActive ? (
          <div>
            <h2>Login</h2>
            <input 
              type="email" 
              placeholder="Email" 
              value={loginData.email}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input 
              type="password" 
              placeholder="Senha" 
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <button 
              onClick={handleLogin}
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '12px', 
                background: '#905cc0', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        ) : (
          <div>
            <h2>Criar Conta</h2>
            <input 
              type="text" 
              placeholder="Nome" 
              value={registerData.name}
              onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
              style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={registerData.email}
              onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
              style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input 
              type="password" 
              placeholder="Senha" 
              value={registerData.password}
              onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
              style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <button 
              onClick={handleRegister}
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '12px', 
                background: '#905cc0', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </div>
        )}
        {error && (
          <div className="error-message" style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#ff4444',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;