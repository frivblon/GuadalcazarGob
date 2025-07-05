import React, { useState } from 'react';
import './auth.css'; // antes login.css o register.css
import Footer from './Footer';
import NavBarComponent from './navBar';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación básica de contraseña
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setError('');
    // Aquí puedes manejar el registro (por ejemplo, llamar a una API)
    console.log('Nombre:', name);
    console.log('Correo:', email);
    console.log('Contraseña:', password);
    // Limpieza de campos tras registro (opcional)
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      <NavBarComponent />
      <main className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Crear Cuenta</h2>

          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}
          <div style={{ textAlign: 'center' }}>
  <a href="#/Login.js">Iniciar Sesión</a>
</div>
          <button type="submit">Registrarse</button>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default Register;
