// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';

const AdminDashboard = () => {
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
    // Send 80G certificate via email
    // You can use email service like SendGrid for sending emails
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {donations.map(donation => (
          <li key={donation.id}>
            {donation.name} - {donation.amount} INR
            {!donation.confirmed && <button onClick={() => handleConfirm(donation.id, donation.email)}>Confirm</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
