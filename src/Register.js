import React, { useState } from 'react';
import axios from 'axios';
import './auth.css';
import Footer from './Footer';
import NavBarComponent from './navBar';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      // Obtener la cookie CSRF antes de enviar la petición POST
      await axios.get('/sanctum/csrf-cookie');

      // Enviar la petición POST a la API de registro
      const response = await axios.post('/api/register', {
        name,
        email,
        password,
        password_confirmation: confirmPassword, // ⬅️ Este campo es requerido por el validador 'confirmed' de Laravel
      });

      if (response.status === 201) {
        setSuccess('¡Registro exitoso! Ya puedes iniciar sesión.');
        // Opcional: Limpiar los campos después del registro exitoso
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        // Opcional: Redirigir al usuario al login
        // setTimeout(() => window.location.href = '/login', 2000);
      }
    } catch (err) {
      console.error('Error de registro:', err);
      if (err.response && err.response.status === 422) {
        const validationErrors = err.response.data.errors;
        const firstError = Object.values(validationErrors)[0][0];
        setError(firstError);
      } else {
        setError('Ocurrió un error. Inténtalo de nuevo.');
      }
    }
  };

  return (
    <>
      <NavBarComponent />
      <main className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Crear Cuenta</h2>
          
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          
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