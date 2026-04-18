import { services } from "../data/services";
import ServiceCard from "../components/ServiceCard";

export default function Home() {
    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Choose a Service
            </h1>

            <div className="grid md:grid-cols-3 gap-6">
                {services.map((s) => (
                    <ServiceCard key={s.id} service={s} />
                ))}
            </div>
        </div>
    );
}