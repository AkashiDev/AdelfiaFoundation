// src/components/Admin.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import Button from '@mui/material/Button';


const Admin = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const donationsCollection = await db.collection('donations').get();
      setDonations(donationsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchDonations();
  }, []);

  const handleConfirm = async (id, email) => {
    await db.collection('donations').doc(id).update({ confirmed: true });
    // Send 80G certificate via email (use an email service like SendGrid)
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {donations.map(donation => (
          <li key={donation.id}>
            {donation.name} - {donation.amount} INR
            {!donation.confirmed && <Button onClick={() => handleConfirm(donation.id, donation.email)}>Confirm</Button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
