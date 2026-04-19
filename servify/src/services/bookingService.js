const BASE = "https://servify-1-q2qu.onrender.com/api";

// Get taken slots for a service on a specific date
export const getTakenSlots = async (serviceId, date) => {
  try {
    const res  = await fetch(`${BASE}/bookings/slots?serviceId=${serviceId}&date=${date}`);
    const data = await res.json();
    return data.takenSlots || [];
  } catch (err) {
    console.warn("Failed to fetch slots:", err.message);
    return [];
  }
};

// Create a booking
export const createBooking = async ({ firebaseId, serviceId, date, timeSlot }) => {
  const res  = await fetch(`${BASE}/bookings`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ firebaseId, serviceId, date, timeSlot }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

// Get all bookings for a user
export const getMyBookings = async (firebaseId) => {
  try {
    const res  = await fetch(`${BASE}/bookings/my/${firebaseId}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn("Failed to fetch bookings:", err.message);
    return [];
  }
};

// Add a new service (admin only)
export const addService = async (firebaseId, serviceData) => {
  const res = await fetch(`${BASE}/services`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ firebaseId, ...serviceData }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

// Get all services from MongoDB
export const getServices = async () => {
  try {
    const res  = await fetch(`${BASE}/services`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn("Failed to fetch services:", err.message);
    return [];
  }
};
