import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

// =============== STYLES ===============
const sharedStyles = {
  container: {
    maxWidth: 800,
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
  },
  heading: {
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '4px',
    margin: '5px',
    textDecoration: 'none',
    display: 'inline-block',
  },
  dangerButton: {
    backgroundColor: '#ff4d4d',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '20px',
  },
  input: {
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    borderBottom: '1px solid #eee',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
};

// =============== COMPONENTS ===============
const LoginForm = ({ login, isRegistering, toggleMode }) => {
  const [formData, setFormData] = useState({ name: '', username: '', password: '' });

  return (
    <div style={sharedStyles.container}>
      <h1 style={sharedStyles.heading}>{isRegistering ? 'Register' : 'Login'}</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        login(formData);
      }} style={sharedStyles.form}>
        {isRegistering && (
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={sharedStyles.input}
            required
          />
        )}
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          style={sharedStyles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          style={sharedStyles.input}
          required
        />
        <button type="submit" style={sharedStyles.button}>
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
      <button
        onClick={toggleMode}
        style={{ ...sharedStyles.button, backgroundColor: '#6c757d' }}
      >
        {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
      </button>
    </div>
  );
};

const FarmerPage = ({ crops, addCrop, restockCrop, logout }) => {
  const [newCrop, setNewCrop] = useState({ name: '', quantity: 0 });

  return (
    <div style={sharedStyles.container}>
      <h1 style={sharedStyles.heading}>Farmer Dashboard</h1>
      <button onClick={logout} style={{ ...sharedStyles.button, ...sharedStyles.dangerButton }}>Logout</button>
      <h2>Add New Crop</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (newCrop.name && newCrop.quantity > 0) {
          addCrop(newCrop);
          setNewCrop({ name: '', quantity: 0 });
        }
      }} style={sharedStyles.form}>
        <input
          type="text"
          placeholder="Crop Name"
          value={newCrop.name}
          onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
          style={sharedStyles.input}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newCrop.quantity}
          onChange={(e) => setNewCrop({ ...newCrop, quantity: parseInt(e.target.value) || 0 })}
          style={sharedStyles.input}
          required
          min="1"
        />
        <button type="submit" style={sharedStyles.button}>Add Crop</button>
      </form>

      <h2>Your Crops</h2>
      {crops.map(crop => (
        <div key={crop.id} style={sharedStyles.listItem}>
          <span>{crop.name} (Qty: {crop.quantity})</span>
          <button onClick={() => restockCrop(crop.id, 10)} style={sharedStyles.button}>+10</button>
        </div>
      ))}
    </div>
  );
};

const UserPage = ({ crops, buyCrop, logout, username }) => (
  <div style={sharedStyles.container}>
    <h1 style={sharedStyles.heading}>Consumer Dashboard</h1>
    <button onClick={logout} style={{ ...sharedStyles.button, ...sharedStyles.dangerButton }}>Logout</button>
    <p>Welcome, <strong>{username}</strong>! Browse and purchase crops here.</p>
    <h2>Available Crops</h2>
    {crops.length === 0 ? (
      <p>No crops available at the moment.</p>
    ) : (
      crops.map(crop => (
        <div key={crop.id} style={sharedStyles.listItem}>
          <span>{crop.name} (Qty: {crop.quantity})</span>
          <button
            onClick={() => buyCrop(crop.id)}
            style={crop.quantity > 0 ? sharedStyles.button : { ...sharedStyles.button, backgroundColor: '#ccc', cursor: 'not-allowed' }}
            disabled={crop.quantity === 0}
          >
            Buy 1
          </button>
        </div>
      ))
    )}
  </div>
);

const AdminPage = ({ users, crops, addCrop, deleteCrop, logout }) => {
  const [newCrop, setNewCrop] = useState({ name: '', quantity: 0 });

  return (
    <div style={sharedStyles.container}>
      <h1 style={sharedStyles.heading}>Admin Dashboard</h1>
      <button onClick={logout} style={{ ...sharedStyles.button, ...sharedStyles.dangerButton }}>Logout</button>

      <h2>Manage Crops</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (newCrop.name && newCrop.quantity > 0) {
          addCrop(newCrop);
          setNewCrop({ name: '', quantity: 0 });
        }
      }} style={sharedStyles.form}>
        <input
          type="text"
          placeholder="Crop Name"
          value={newCrop.name}
          onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
          style={sharedStyles.input}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newCrop.quantity}
          onChange={(e) => setNewCrop({ ...newCrop, quantity: parseInt(e.target.value) || 0 })}
          style={sharedStyles.input}
          required
          min="1"
        />
        <button type="submit" style={sharedStyles.button}>Add Crop</button>
      </form>

      <h3>All Crops</h3>
      {crops.map(crop => (
        <div key={crop.id} style={sharedStyles.listItem}>
          <span>{crop.name} (Qty: {crop.quantity})</span>
          <button onClick={() => deleteCrop(crop.id)} style={{ ...sharedStyles.button, ...sharedStyles.dangerButton }}>Delete</button>
        </div>
      ))}

      <h2>System Users</h2>
      {users.map(user => (
        <div key={user.username} style={sharedStyles.listItem}>
          <span>{user.name} ({user.username}) - {user.role}</span>
        </div>
      ))}
    </div>
  );
};

const RoleSelection = ({ logout }) => (
  <div style={sharedStyles.container}>
    <h1 style={sharedStyles.heading}>Select Dashboard</h1>
    <button onClick={logout} style={{ ...sharedStyles.button, ...sharedStyles.dangerButton }}>Logout</button>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
      <Link to="/farmer" style={sharedStyles.button}>Farmer Dashboard</Link>
      <Link to="/user" style={sharedStyles.button}>Consumer Dashboard</Link>
    </div>
  </div>
);

// =============== APP WRAPPED WITH ROUTER ===============
const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// =============== MAIN APP ===============
const App = () => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [
      { name: 'Admin', username: 'admin', password: 'admin', role: 'admin' },
      { name: 'Farmer', username: 'farmer', password: 'farmer', role: 'farmer' },
      { name: 'User', username: 'user', password: 'user', role: 'user' }
    ];
  });

  const [crops, setCrops] = useState(() => {
    const saved = localStorage.getItem('crops');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Wheat', quantity: 100 },
      { id: 2, name: 'Rice', quantity: 50 },
    ];
  });

  const [loggedInUser, setLoggedInUser] = useState(() => {
    const saved = localStorage.getItem('loggedInUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('crops', JSON.stringify(crops));
  }, [crops]);

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem('loggedInUser');
    }
  }, [loggedInUser]);

  const handleLogin = (formData) => {
    const { name, username, password } = formData;
    const trimmedUsername = username.trim().toLowerCase();

    if (isRegistering) {
      if (!name || !username || !password) {
        alert('Please fill in all fields');
        return;
      }

      if (users.some(u => u.username.toLowerCase() === trimmedUsername)) {
        alert('Username already exists');
        return;
      }

      const newUser = {
        name: name.trim(),
        username: trimmedUsername,
        password,
        role: 'user',
      };

      setUsers([...users, newUser]);
      alert('Registration successful!');
      setIsRegistering(false);
      return;
    }

    const user = users.find(
      u => u.username.toLowerCase() === trimmedUsername && u.password === password
    );

    if (!user) {
      alert('Invalid credentials');
      return;
    }

    setLoggedInUser(user);
    if (user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/select-role');
    }
  };

  const logout = () => {
    setLoggedInUser(null);
    navigate('/');
  };

  const addCrop = (newCrop) => {
    setCrops([...crops, { ...newCrop, id: Date.now() }]);
  };

  const deleteCrop = (cropId) => {
    setCrops(crops.filter(crop => crop.id !== cropId));
  };

  const restockCrop = (cropId, quantity) => {
    setCrops(crops.map(crop =>
      crop.id === cropId ? { ...crop, quantity: crop.quantity + quantity } : crop
    ));
  };

  const buyCrop = (cropId) => {
    const cropToBuy = crops.find(crop => crop.id === cropId);
    if (cropToBuy && cropToBuy.quantity > 0) {
      setCrops(crops.map(crop =>
        crop.id === cropId ? { ...crop, quantity: crop.quantity - 1 } : crop
      ));
      alert(`You bought 1 ${cropToBuy.name}`);
    } else {
      alert('Crop is out of stock');
    }
  };

  return (
    <Routes>
      <Route path="/" element={<LoginForm login={handleLogin} isRegistering={isRegistering} toggleMode={() => setIsRegistering(!isRegistering)} />} />
      <Route path="/select-role" element={loggedInUser ? <RoleSelection logout={logout} /> : <Navigate to="/" />} />
      <Route path="/admin" element={loggedInUser?.role === 'admin' ? <AdminPage users={users} crops={crops} addCrop={addCrop} deleteCrop={deleteCrop} logout={logout} /> : <Navigate to="/" />} />
      <Route path="/farmer" element={loggedInUser ? <FarmerPage crops={crops} addCrop={addCrop} restockCrop={restockCrop} logout={logout} /> : <Navigate to="/" />} />
      <Route
        path="/user"
        element={
          loggedInUser ? (
            <UserPage
              crops={crops}
              buyCrop={buyCrop}
              logout={logout}
              username={loggedInUser.username}
            />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};

export default AppWrapper;

