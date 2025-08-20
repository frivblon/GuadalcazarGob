import React, { useState } from 'react';
import './auth.css';
import { useNavigate, Link } from 'react-router-dom'; // Se importa Link para la navegación
import { useAuth } from './AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // 1️⃣ Obtenemos la función 'login' del contexto.
  // Esta función ya contiene toda la lógica (CSRF, POST a /login, y obtener usuario).
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 2️⃣ Llamamos a la única función necesaria.
      // Le pasamos las credenciales y esperamos a que termine.
      await login({ email, password });

      // 3️⃣ Si la línea anterior no dio error, el login fue exitoso.
      // El contexto ya actualizó el estado del usuario en toda la app.
      // Solo nos queda redirigir.
     navigate('/admin/dashboard'); 
    } catch (err) {
      // El manejo de errores sigue siendo el mismo.
      // Si las credenciales son inválidas, la función 'login' del contexto
      // lanzará un error que atrapamos aquí.
      console.error('Error en el componente de login:', err);
      if (err.response && err.response.status === 422) {
        setError('Credenciales incorrectas. Verifica tu email y contraseña.');
      } else {
        setError('No se pudo conectar con el servidor. Inténtalo más tarde.');
      }
    }
  };
  return (
    <>
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
    </>
  );
}

export default Login;