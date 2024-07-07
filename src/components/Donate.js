// src/components/Donate.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import QRCode from 'qrcode.react';

const Donate = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', amount: '' });
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'donations'), {
        ...formData,
        confirmed: false,
        createdAt: new Date(),
      });
      const qrData = `upi://pay?pa=YOUR_UPI_ID@upi&pn=Hands of God&am=${formData.amount}&cu=INR`;
      setQrCodeUrl(qrData);
      setIsFormSubmitted(true);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleDone = () => {
    alert('Thank you for your donation! We will send a confirmation email once we receive the payment.');
    setFormData({ name: '', email: '', phone: '', amount: '' });
    setQrCodeUrl('');
    setIsFormSubmitted(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto' }}>
      {!isFormSubmitted ? (
        <form onSubmit={handleSubmit}>
          <TextField label="Name" name="name" variant="outlined" value={formData.name} onChange={handleChange} required />
          <TextField label="Email" name="email" type="email" variant="outlined" value={formData.email} onChange={handleChange} required />
          <TextField label="Phone" name="phone" variant="outlined" value={formData.phone} onChange={handleChange} required />
          <TextField label="Amount (INR)" name="amount" type="number" variant="outlined" value={formData.amount} onChange={handleChange} required />
          <Button type="submit" variant="contained" color="primary">Confirm</Button>
        </form>
      ) : (
        <>
          <QRCode value={qrCodeUrl} />
          <Button onClick={handleDone} variant="contained" color="primary">Done</Button>
        </>
      )}
    </Box>
  );
};

export default Donate;
