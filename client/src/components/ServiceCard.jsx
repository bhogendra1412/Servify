import { useNavigate } from "react-router-dom";

export default function ServiceCard({ service }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">
                {service.name}
            </h3>

            <p className="text-gray-500 mb-3">
                Starting at ₹{service.price}
            </p>

            <button
                onClick={() => navigate(`/booking/${service.id}`)}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
                Book Now
            </button>
        </div>
    ); 
}