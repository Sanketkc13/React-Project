import React, { useState } from 'react';

function FarmerPage({ loggedInUser , crops = [], addCrop, restockCrop, logout }) {
  const [cropName, setCropName] = useState('');
  const [cropQuantity, setCropQuantity] = useState('');
  const [cropImage, setCropImage] = useState(null); // State to hold the uploaded image

  // Handle Add Crop action
  const handleAdd = () => {
    if (cropName && cropQuantity && cropImage) {
      // Ensure cropQuantity is treated as a number
      const newCrop = {
        name: cropName,
        quantity: parseInt(cropQuantity, 10),
        farmerId: loggedInUser.username,
        image: cropImage, // Include the image in the crop object
      };
      addCrop(newCrop);
      setCropName('');
      setCropQuantity('');
      setCropImage(null); // Reset the image after adding the crop
    }
  };

  return (
    <div>
      <h2>Welcome, {loggedInUser.name}</h2>
      <button onClick={logout}>Logout</button>

      <h3>Add Crop</h3>
      <input
        type="text"
        placeholder="Crop Name"
        value={cropName}
        onChange={(e) => setCropName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={cropQuantity}
        onChange={(e) => setCropQuantity(e.target.value)}
      />
      <input
        type="file"
        accept="image/*" // Accept image files only
        onChange={(e) => setCropImage(e.target.files[0])} // Set the uploaded image
      />
      <button onClick={handleAdd}>Add</button>

      <h3>Available Crops</h3>
      <ul>
        {Array.isArray(crops) && crops.length > 0 ? (
          crops.map((crop) => (
            <li key={crop.id}>
              {crop.name} - {crop.quantity}
              {crop.image && (
                <div>
                  <img
                    src={URL.createObjectURL(crop.image)} // Create a URL for the uploaded image
                    alt={crop.name}
                    style={{ width: '100px', height: 'auto', marginLeft: '10px' }} // Style the image
                  />
                </div>
              )}
            </li>
          ))
        ) : (
          <li>No crops available</li>
        )}
      </ul>
    </div>
  );
}

export default FarmerPage;
