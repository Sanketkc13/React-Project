import React from 'react';
import CropItem from './CropItem';

function CropList({
  crops = [],              // Default to empty array to avoid crash if undefined
  buyCrop,
  showSoldOut = false,
  isFarmerView = false,
  restockCrop,
}) {
  if (!crops || crops.length === 0) {
    return (
      <p style={{ color: '#777', fontStyle: 'italic' }}>
        {isFarmerView ? 'No crops uploaded yet.' : 'No crops available currently.'}
      </p>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {crops.map((crop) => (
        <CropItem
          key={crop.id}
          crop={crop}
          buyCrop={buyCrop}
          showSoldOut={showSoldOut}
          isFarmerView={isFarmerView}
          restockCrop={restockCrop}
        />
      ))}
    </div>
  );
}

export default CropList;
