import React from 'react';

function RoleSelection({ onSelectRole, username, onLogout }) {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: 40,
          borderRadius: 16,
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          textAlign: 'center',
          maxWidth: 400,
          width: '90%',
        }}
      >
        <h2 style={{ marginBottom: 24 }}>Welcome, {username}!</h2>
        <p style={{ marginBottom: 24, fontSize: 18 }}>Choose your role to continue:</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20 }}>
          <button
            onClick={() => onSelectRole('farmer')}
            style={{
              flex: 1,
              padding: '16px 0',
              background: '#43a047',
              border: 'none',
              borderRadius: 10,
              color: 'white',
              fontSize: 18,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(67,160,71,0.5)',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#388e3c'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#43a047'}
          >
            Farmer
          </button>
          <button
            onClick={() => onSelectRole('user')}
            style={{
              flex: 1,
              padding: '16px 0',
              background: '#1976d2',
              border: 'none',
              borderRadius: 10,
              color: 'white',
              fontSize: 18,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(25,118,210,0.5)',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#105ea1'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1976d2'}
          >
            User
          </button>
        </div>
        <button
          onClick={onLogout}
          style={{
            marginTop: 30,
            background: 'none',
            border: 'none',
            color: '#555',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default RoleSelection;
