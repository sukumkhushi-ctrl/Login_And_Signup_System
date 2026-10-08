import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        setError('Session expired or unauthorized.');
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (error) return <p className="error">{error}</p>;
  if (!user) return <p>Loading user profile...</p>;

  return (
    <div className="auth-container">
      <h2>Welcome, {user.name}!</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>User ID:</strong> {user._id}</p>
      <button onClick={handleLogout} style={{ backgroundColor: '#dc3545' }}>Logout</button>
    </div>
  );
}

export default Dashboard;