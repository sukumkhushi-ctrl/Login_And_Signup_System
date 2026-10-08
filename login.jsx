import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} required />
        </div>
        <button type="submit">Log In</button>
      </form>
      <Link to="/register" className="nav-link">Don't have an account? Register</Link>
    </div>
  );
}

export default Login;