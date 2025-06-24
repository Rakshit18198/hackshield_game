// src/ShopPage.js
import React from 'react';
import './ShopPage.css';

const ShopPage = () => {
  const items = [
    { id: 1, name: 'Firewall Upgrade', price: 500 },
    { id: 2, name: 'Antivirus Shield', price: 750 },
    { id: 3, name: 'Encrypted VPN', price: 1000 },
    { id: 4, name: 'Malware Scanner', price: 400 },
  ];

  const handleBuy = (itemName) => {
    alert(`You purchased: ${itemName}`);
  };

  return (
    <div className="shop-container">
      <h1>🛒 HackShield Shop</h1>
      <div className="shop-items">
        {items.map(item => (
          <div className="shop-card" key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.price} 🪙</p>
            <button onClick={() => handleBuy(item.name)}>Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
