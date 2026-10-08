import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Name</label>
          <input type="text" name="name" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/login" className="nav-link">Already have an account? Login</Link>
    </div>
  );
}

export default Register;