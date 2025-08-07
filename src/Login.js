import React, { useState } from 'react';
import axios from 'axios';
import './auth.css';
import Footer from './Footer';
import NavBarComponent from './navBar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // ➡️ 1. Petición para obtener la cookie CSRF.
      // Laravel establecerá la cookie de sesión en el navegador.
      await axios.get('/sanctum/csrf-cookie');

      // ➡️ 2. Hacer la llamada POST a la API de Laravel
      // Gracias a la configuración en App.js, las credenciales (cookies) se enviarán automáticamente.
      const response = await axios.post('/api/login', {
        email: email,
        password: password,
      });

      // ➡️ 3. Manejar la respuesta del servidor
      // En el flujo de Sanctum, un login exitoso devuelve 204 No Content.
      if (response.status === 204) {
        console.log('Inicio de sesión exitoso!');
        alert('¡Bienvenido! Has iniciado sesión correctamente.');
        
        // Opcional: Ahora que estás autenticado, puedes obtener los datos del usuario.
        // La cookie de sesión se enviará automáticamente con esta petición.
        try {
          const userResponse = await axios.get('/api/user');
          console.log('Datos del usuario:', userResponse.data);
          // Aquí puedes guardar los datos del usuario en el estado global (ej. Redux, Context)
        } catch (userErr) {
          console.error('Error al obtener los datos del usuario:', userErr);
        }
        
      } else {
        // En caso de que el servidor devuelva otro código de éxito
        console.log('Respuesta del servidor inesperada:', response);
      }
    } catch (err) {
      // ➡️ 4. Manejar los errores de la llamada
      if (err.response) {
        console.error('Error de autenticación:', err.response.data);
        // El error 422 es por credenciales incorrectas.
        if (err.response.status === 422 && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
        }
      } else {
        console.error('Ocurrió un error:', err.message);
        setError('No se pudo conectar con el servidor.');
      }
    }
  };

  return (
    <>
      <NavBarComponent />
      <main className="container d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <div className="row w-100">
          <div className="col-md-4 offset-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
                
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input type="email" className="form-control" id="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  <div className="mb-3 text-center">
                    <a href="#/Register.js">Registrarse</a>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Entrar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Login;