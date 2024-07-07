// src/components/Admin.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import Button from '@mui/material/Button';

const Admin = () => {
  const [donations, setDonations] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchDonations = async () => {
        const donationsCollection = await getDocs(collection(db, 'donations'));
        const donationsData = donationsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDonations(donationsData);
      };
      fetchDonations();
    }
  }, [isAuthenticated]);

  const handleConfirm = async (id, email) => {
    try {
      alert(id)
      const donationRef = doc(db, 'donations', id);
      alert(donationRef.path)
      await updateDoc(donationRef, { confirmed: true });
      alert(`Donation ${id} confirmed for email ${email}`);
      // Send 80G certificate via email (use an email service like SendGrid)
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  if (!isAuthenticated) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Button onClick={handleLogout}>Logout</Button>
      <ul>
        {donations.map(donation => (
          <li key={donation}>
         {donation.name} - {donation.amount} INR
            {!donation.confirmed && <Button onClick={() => handleConfirm(donation.id, donation.email)}>Confirm</Button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
