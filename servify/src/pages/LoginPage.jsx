import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function LoginPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            return setError("All fields required");
        }

        if (form.password.length < 6) {
            return setError("Password must be at least 6 chars");
        }

        try {
            // ✅ Firebase login
            const userCredential = await loginUser(form.email, form.password);

            console.log("Logged in user:", userCredential.user);

            // ✅ Navigate after success
            navigate("/services");

        } catch (err) {
            console.log(err);
            setError(err.message); // show firebase error
        }
    };


    return (
        <div>

            {/* NAVBAR (reuse) */}
            <nav className="navbar">
                <Link to="/" className="logo">Servi<span>fy</span></Link>
                <div className="nav-actions">
                    <Link to="/register" className="btn-register">Create Account</Link>
                </div>
            </nav>

            {/* LOGIN SECTION */}
            <section className="section" style={{ maxWidth: "420px" }}>
                <p className="section-label">Access</p>
                <h2 className="section-title">Login to your account</h2>

                {error && (
                    <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
                )}

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        style={{
                            padding: "0.8rem",
                            borderRadius: "10px",
                            border: "1px solid rgba(0,0,0,0.1)"
                        }}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        style={{
                            padding: "0.8rem",
                            borderRadius: "10px",
                            border: "1px solid rgba(0,0,0,0.1)"
                        }}
                    />

                    <button className="btn-primary" type="submit">
                        Login
                    </button>

                    <Link to="/register" className="btn-outline" style={{ textAlign: "center" }}>
                        Create Account
                    </Link>

                </form>
            </section>

        </div>
    );
}