import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD3UDqn7_usF0Myi4uL0QgZUuMJ6PfFhyY",
  authDomain: "adelfia-foundation.firebaseapp.com",
  projectId: "adelfia-foundation",
  storageBucket: "adelfia-foundation.appspot.com",
  messagingSenderId: "321570501455",
  appId: "1:321570501455:web:4b8491c14e8ce89ad40b3a",
  measurementId: "G-JJN4ELDQTC"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };