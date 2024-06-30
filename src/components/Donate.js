// src/components/Donate.js
import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { db } from '../firebase';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Donate = () => {
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
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto' }}>
      <TextField label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} required />
      <TextField label="Email" type="email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <TextField label="Phone" variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <TextField label="Amount in INR" type="number" variant="outlined" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <Button type="submit" variant="contained" color="primary">Confirm</Button>
      {qrCode && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <QRCode value={qrCode} />
          <Button onClick={() => alert('Thank you for your donation! We will confirm via email.')}>Done</Button>
        </Box>
      )}
    </Box>
  );
};

export default Donate;
