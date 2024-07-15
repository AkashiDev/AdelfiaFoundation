// src/components/DonationForm.js
import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { db } from '../firebase';
import './DonationForm.css';


const DonationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDonation = {
      name,
      email,
      phone,
      amount,
      confirmed: false,
      createdAt: new Date(),
    };
    await db.collection('donations').add(newDonation);
    const upiString = `upi://pay?pa=NGO_UPI_ID&pn=NGO_NAME&am=${amount}`;
    setQrCode(upiString);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        <input
          type="text"
          placeholder="Name1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginBottom: '100px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginBottom: '10px',marginTop: '50px' }}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={{ marginBottom: '10px' }}
        />
        <input
          type="number"
          placeholder="Amount in INR"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{ marginBottom: '10px' }}
        />
        <button type="submit" style={{ marginBottom: '10px' }}>Confirm</button>
      </form>
      {qrCode && (
        <div>
          <QRCode value={qrCode} />
          <button onClick={() => alert('Thank you for your donation! We will confirm via email.')}>Done</button>
        </div>
      )}
    </div>
  );
};

export default DonationForm;
    