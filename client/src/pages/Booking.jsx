import { useParams } from "react-router-dom";
import { services } from "../data/services";
import SlotPicker from "../components/SlotPicker";

export default function Booking() {
    const { id } = useParams();
    const service = services.find(s => s.id === Number(id));

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-2">
                {service?.name}
            </h2>

            <p className="text-gray-600 mb-4">
                Price: ₹{service?.price}
            </p>

            <SlotPicker />
        </div>
    );
}