import React, { useState, useEffect } from 'react';

const styles = {
  container: {
    maxWidth: 500,
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    marginBottom: '20px',
    textAlign: 'center',
    color: '#222',
  },
  logout: {
    backgroundColor: '#e60000',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    cursor: 'pointer',
    borderRadius: '5px',
    float: 'right',
  },
  section: {
    marginBottom: '30px',
  },
  item: {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  removeBtn: {
    backgroundColor: '#cc0000',
    color: 'white',
    border: 'none',
    padding: '4px 8px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  loginBtn: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '12px 0',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '16px',
    marginTop: '10px',
  },
  info: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#555',
    textAlign: 'center',
  },
};

function LoginPage({ users, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      alert('Invalid username or password');
      return;
    }

    onLogin(user);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Login</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.loginBtn}>
          Login
        </button>
      </form>
      <div style={styles.info}>
        <p><strong>Admin Login:</strong> admin1 / admin1</p>
        <p><strong>User Login:</strong> user1 / password, user2 / password</p>
      </div>
    </div>
  );
}

function AdminPage({ users, setUsers, crops, setCrops, logout }) {
  const handleRemoveUser = (username) => {
    const user = users.find((u) => u.username === username);
    if (user?.role === 'admin') {
      alert("Admin account cannot be removed.");
      return;
    }

    const confirm = window.confirm(`Are you sure you want to remove ${username}?`);
    if (confirm) {
      setUsers(users.filter((u) => u.username !== username));
    }
  };

  const handleRemoveCrop = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this crop?');
    if (confirm) {
      setCrops(crops.filter((crop) => crop.id !== id));
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={logout} style={styles.logout}>Logout</button>
      <h1 style={styles.heading}>Admin Dashboard</h1>

      <div style={styles.section}>
        <h2>All Users</h2>
        {users.filter(u => u.role !== 'admin').length === 0 ? (
          <p>No regular users found.</p>
        ) : (
          <ul>
            {users
              .filter(u => u.role !== 'admin')
              .map((user) => (
                <li key={user.username} style={styles.item}>
                  {user.username}
                  <button
                    onClick={() => handleRemoveUser(user.username)}
                    style={styles.removeBtn}
                  >
                    Remove
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>

      <div style={styles.section}>
        <h2>All Crops</h2>
        {crops.length === 0 ? (
          <p>No crops found.</p>
        ) : (
          <ul>
            {crops.map((crop) => (
              <li key={crop.id} style={styles.item}>
                {crop.name} (Qty: {crop.quantity})
                <button
                  onClick={() => handleRemoveCrop(crop.id)}
                  style={styles.removeBtn}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function App() {
  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : [
      { username: 'admin1', password: 'admin1', role: 'admin' },
      { username: 'user1', password: 'password', role: 'user' },
      { username: 'user2', password: 'password', role: 'user' },
    ];
  });

  const [crops, setCrops] = useState(() => {
    const stored = localStorage.getItem('crops');
    return stored ? JSON.parse(stored) : [
      { id: 1, name: 'Wheat', quantity: 100 },
      { id: 2, name: 'Corn', quantity: 75 },
    ];
  });

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('crops', JSON.stringify(crops));
  }, [users, crops]);

  const handleLogin = (user) => setLoggedInUser(user);
  const logout = () => setLoggedInUser(null);

  if (!loggedInUser) return <LoginPage users={users} onLogin={handleLogin} />;

  return loggedInUser.role === 'admin' ? (
    <AdminPage
      users={users}
      setUsers={setUsers}
      crops={crops}
      setCrops={setCrops}
      logout={logout}
    />
  ) : (
    <div style={styles.container}>
      <button onClick={logout} style={styles.logout}>Logout</button>
      <h1 style={styles.heading}>Welcome {loggedInUser.username}!</h1>
      <p style={{ textAlign: 'center' }}>You are logged in as a regular user.</p>
    </div>
  );
}

export default App;
