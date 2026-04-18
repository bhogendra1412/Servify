import { useState } from "react";
import BookingSummary from "./BookingSummary";

const slots = [
    { id: 1, time: "10:00", booked: false },
    { id: 2, time: "10:30", booked: true },
    { id: 3, time: "11:00", booked: false },
    { id: 4, time: "11:30", booked: false },
];

export default function SlotPicker() {
    const [selected, setSelected] = useState(null);

    const selectedSlot = slots.find(s => s.id === selected)?.time;

    return (
        <div>
            <h3 className="text-lg font-semibold mb-3">
                Select Time Slot
            </h3>

            <div className="grid grid-cols-2 gap-3">
                {slots.map((slot) => (
                    <button
                        key={slot.id}
                        disabled={slot.booked}
                        onClick={() => setSelected(slot.id)}
                        className={`
              p-3 rounded-lg border text-center
              ${slot.booked ? "bg-gray-300 cursor-not-allowed" : ""}
              ${selected === slot.id ? "bg-blue-500 text-white" : ""}
            `}
                    >
                        {slot.time}
                    </button>
                ))}
            </div>

            <BookingSummary selectedSlot={selectedSlot} />
        </div>
    );
}