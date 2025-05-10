import React from 'react';
import CropList from './CropList';

function UserPage({ crops, buyCrop, logout, username }) {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
      }}
    >
      <header
        style={{
          flex: '0 0 60px',
          padding: '0 24px',
          backgroundColor: '#1565c0',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: 20,
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        }}
      >
        <div>User Dashboard</div>
        <div>
          <span style={{ marginRight: 16 }}>Welcome, {username}</span>
          <button
            onClick={logout}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontWeight: 'normal',
              fontSize: 14,
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main
        style={{
          flex: '1 1 auto',
          padding: 24,
          overflowY: 'auto',
        }}
      >
        <h2 style={{ marginBottom: 20, color: '#1565c0' }}>
          Available Crops to Buy
        </h2>
        <CropList crops={crops} buyCrop={buyCrop} showSoldOut />
      </main>
    </div>
  );
}

export default UserPage;
