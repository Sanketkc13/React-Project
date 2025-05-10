import React from 'react';

function CropItem({ crop, buyCrop, showSoldOut = false, isFarmerView = false, restockCrop }) {
  const { id, name, price, quantity, image } = crop;

  const handleRestockClick = () => {
    const qty = prompt('Enter quantity to restock:');
    const qtyInt = parseInt(qty);
    if (qtyInt && qtyInt > 0) {
      restockCrop(id, qtyInt);
    } else {
      alert('Invalid quantity');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
      }}
    >
      <img
        src={image}
        alt={name}
        style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, marginRight: 16 }}
      />
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: 0 }}>{name}</h3>
        <p style={{ margin: '4px 0' }}>Rs {price} per kg</p>
        <p style={{ margin: '4px 0' }}>
          Quantity: {quantity > 0 ? quantity : <strong style={{ color: 'red' }}>Sold Out</strong>}
        </p>
      </div>
      <div>
        {isFarmerView ? (
          quantity === 0 ? (
            <button
              onClick={handleRestockClick}
              style={{
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 6,
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Restock
            </button>
          ) : null
        ) : showSoldOut ? (
          quantity > 0 ? (
            <button
              onClick={() => buyCrop(id)}
              style={{
                backgroundColor: '#43a047',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 6,
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Buy
            </button>
          ) : (
            <span style={{ color: 'gray', fontWeight: 'bold' }}>Sold Out</span>
          )
        ) : null}
      </div>
    </div>
  );
}

export default CropItem;