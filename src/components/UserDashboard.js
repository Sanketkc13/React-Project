import React from 'react';

export default function UserDashboard({ user }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Your Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
}
