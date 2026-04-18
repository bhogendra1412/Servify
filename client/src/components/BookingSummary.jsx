export default function BookingSummary({ selectedSlot }) {
    return (
        <div className="mt-6 p-4 bg-white rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">
                Booking Summary
            </h3>

            <p className="text-gray-600">
                Selected Slot: {selectedSlot || "None"}
            </p>

            <button
                disabled={!selectedSlot}
                className={`mt-4 w-full py-2 rounded-lg text-white ${selectedSlot
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-400"
                    }`}
            >
                Confirm Booking
            </button>
        </div>
    );
}