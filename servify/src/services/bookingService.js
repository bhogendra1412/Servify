import { db } from "../firebase/config";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// Get services
export const getServices = async () => {
  const snapshot = await getDocs(collection(db, "services"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Add booking
export const addBooking = async (data) => {
  return await addDoc(collection(db, "bookings"), data);
};

// Get booked slots
export const getBookingsByService = async (serviceId, date) => {
  const q = query(
    collection(db, "bookings"),
    where("serviceId", "==", serviceId),
    where("date", "==", date)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};