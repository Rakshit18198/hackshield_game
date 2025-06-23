// src/pages/InventoryPage.js
import React from 'react';
import './InventoryPage.css';

const inventoryItems = [
  { id: 1, name: 'Firewall Booster', type: 'Defense', description: 'Blocks 1 attack' },
  { id: 2, name: 'Phishing Detector', type: 'Tool', description: 'Highlights malicious links' },
  { id: 3, name: 'Encryption Key', type: 'Power-Up', description: 'Unlocks secret mission' },
];

const InventoryPage = () => {
  return (
    <div className="inventory-container">
      <h1>Your Inventory</h1>
      <div className="inventory-grid">
        {inventoryItems.map(item => (
          <div key={item.id} className="inventory-card">
            <h3>{item.name}</h3>
            <p><strong>Type:</strong> {item.type}</p>
            <p>{item.description}</p>
            <button className="use-button">Use</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;
