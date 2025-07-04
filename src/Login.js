import React, { useState } from 'react';
import './login.css';
import Footer from './Footer';
import NavBarComponent from './navBar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el login (por ejemplo, llamar a una API)
    console.log('Correo:', email);
    console.log('Contraseña:', password);
  };

  return (
    <>
      <NavBarComponent />
      <main className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Iniciar Sesión</h2>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default Login;
