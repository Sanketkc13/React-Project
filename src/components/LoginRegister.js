import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function LoginRegister({ onLogin, users = [], setUsers }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (isRegistering) {
      if (!formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
        setError('All fields are required');
        return false;
      }
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        setError('Invalid email format');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    } else {
      if (!formData.username || !formData.password) {
        setError('Username and password are required');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!validateForm()) return;

    if (isRegistering) {
      const existingUser = users.find(u =>
        u.username.toLowerCase() === formData.username.toLowerCase() ||
        u.email.toLowerCase() === formData.email.toLowerCase()
      );

      if (existingUser) {
        setError('User already exists with this email or username');
        return;
      }

      const newUser = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        role: 'user'
      };

      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      setSuccessMessage('Registration successful! Please login.');
      setIsRegistering(false);
      setFormData({ email: '', username: '', password: '', confirmPassword: '' });

    } else {
      const user = users.find(u =>
        u.username.toLowerCase() === formData.username.toLowerCase() &&
        u.password === formData.password
      );

      if (!user) {
        setError('Invalid credentials');
        return;
      }

      onLogin(user);
      navigate(user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <img src={logo} alt="Logo" style={logoStyle} />

        <h2 style={headerStyle}>
          {isRegistering ? 'Create Account' : 'Welcome Back'}
        </h2>

        {error && <div style={errorStyle}>{error}</div>}
        {successMessage && <div style={successStyle}>{successMessage}</div>}

        <form onSubmit={handleSubmit} style={formStyle}>
          {isRegistering && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              style={inputStyle}
              autoComplete="email"
            />
          )}

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            style={inputStyle}
            autoComplete="username"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            style={inputStyle}
            autoComplete={isRegistering ? "new-password" : "current-password"}
          />

          {isRegistering && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              style={inputStyle}
              autoComplete="new-password"
            />
          )}

          <button type="submit" style={buttonStyle}>
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>

        <p style={toggleTextStyle}>
          {isRegistering ? 'Already have an account? ' : 'Need an account? '}
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
              setSuccessMessage('');
            }}
            style={toggleButtonStyle}
          >
            {isRegistering ? 'Login here' : 'Register here'}
          </button>
        </p>
      </div>
    </div>
  );
}

// ✅ UI Style Fixes
const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
  padding: '20px',
  fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
};

const formContainerStyle = {
  background: 'rgba(255, 255, 255, 0.15)',
  padding: '40px',
  borderRadius: '16px',
  width: '100%',
  maxWidth: '400px',
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  textAlign: 'center',
};

const logoStyle = {
  width: '120px',
  marginBottom: '30px',
  filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.3))',
};

const headerStyle = {
  color: '#fff',
  marginBottom: '30px',
  fontSize: '1.8rem',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  marginBottom: '25px',
};

const inputStyle = {
  padding: '14px',
  borderRadius: '8px',
  border: 'none',
  outline: 'none',
  fontSize: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  color: '#000',
};

const buttonStyle = {
  backgroundColor: '#ffa726',
  color: '#000',
  padding: '14px',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  marginTop: '10px',
};

const errorStyle = {
  color: '#fff',
  backgroundColor: 'rgba(255, 0, 0, 0.6)',
  padding: '12px',
  borderRadius: '8px',
  marginBottom: '20px',
  fontWeight: 'bold',
};

const successStyle = {
  color: '#fff',
  backgroundColor: 'rgba(0, 255, 0, 0.5)',
  padding: '12px',
  borderRadius: '8px',
  marginBottom: '20px',
  fontWeight: 'bold',
};

const toggleTextStyle = {
  color: '#fff',
  fontSize: '0.9rem',
  marginTop: '20px',
};

const toggleButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#ffd54f',
  fontWeight: 'bold',
  cursor: 'pointer',
  textDecoration: 'underline',
  padding: '0 4px',
  fontSize: '0.9rem',
};

export default LoginRegister;
