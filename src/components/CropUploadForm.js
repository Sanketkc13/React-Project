import React, { useState } from 'react';

function CropUploadForm({ addCrop }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Helper to convert image file to base64 string for persistence
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      try {
        const base64 = await getBase64(file);
        setImagePreview(base64);
      } catch (error) {
        console.error('Error reading image file:', error);
        setImagePreview(null);
      }
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !price.trim() || !quantity.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const crop = {
      id: Date.now(),
      name: name.trim(),
      price: parseFloat(price).toFixed(2),
      quantity: parseInt(quantity, 10),
      image: imagePreview || 'https://via.placeholder.com/150?text=No+Image',
    };

    addCrop(crop);

    // Reset form and clear preview
    setName('');
    setPrice('');
    setQuantity('1');
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'grid',
        gap: '1rem',
        maxWidth: 420,
        margin: '0 auto',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '16px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <label style={{ fontWeight: '600' }}>
        Crop Name
        <input
          type="text"
          placeholder="Enter crop name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px 12px',
            marginTop: 6,
            borderRadius: 8,
            border: '1px solid #ccc',
            fontSize: 16,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </label>

      <label style={{ fontWeight: '600' }}>
        Price (Rs)
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 6,
            borderRadius: 8,
            border: '1px solid #ccc',
            padding: '10px 12px',
          }}
        >
          <span
            style={{
              marginRight: 6,
              fontSize: 16,
              fontWeight: 'bold',
              color: '#555',
              userSelect: 'none',
            }}
          >
            Rs
          </span>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Price per kg"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{
              border: 'none',
              outline: 'none',
              fontSize: 16,
              flex: 1,
              width: '100%',
            }}
          />
        </div>
      </label>

      <label style={{ fontWeight: '600' }}>
        Quantity
        <select
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          style={{
            width: '100%',
            marginTop: 6,
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid #ccc',
            fontSize: 16,
            outline: 'none',
            backgroundColor: '#fff',
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            cursor: 'pointer',
          }}
        >
          {Array.from({ length: 6 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </label>

      <label style={{ fontWeight: '600' }}>
        Crop Image
        <div
          style={{
            marginTop: 6,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              cursor: 'pointer',
              flex: '1',
              borderRadius: 8,
              border: '1px solid #ccc',
              padding: '8px 12px',
            }}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            />
          )}
        </div>
      </label>

      <button
        type="submit"
        style={{
          backgroundColor: '#43a047',
          color: '#fff',
          border: 'none',
          padding: '12px',
          borderRadius: 8,
          fontWeight: 'bold',
          fontSize: 18,
          cursor: 'pointer',
          boxShadow: '0 6px 15px rgba(67, 160, 71, 0.6)',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#388e3c')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#43a047')}
      >
        Upload Crop
      </button>
    </form>
  );
}

export default CropUploadForm;
