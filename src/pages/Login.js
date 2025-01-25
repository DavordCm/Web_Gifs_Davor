import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
//Ejemplo de usuario falso
  const fakeUser = {
    email: 'usuario@ejemplo.com',
    password: '123456',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (credentials.email === fakeUser.email && credentials.password === fakeUser.password) {
      alert('¡Accediste correctamente!');
      navigate('/gifsearch'); // Redirige a la página deseada
    } else {
      alert('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <p>
        ¿No tienes cuenta?{' '}
        <span onClick={() => navigate('/register')} className="link">
          Regístrate
        </span>
      </p>
    </div>
  );
}

export default Login;
