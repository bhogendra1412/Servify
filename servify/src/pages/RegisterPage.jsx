import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import { db } from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    /* ── Register ── */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await registerUser(form.email, form.password);

            console.log("User created:", userCredential.user);

            // Store extra user data in Firestore
            await setDoc(doc(db, "users", userCredential.user.uid), {
                name: form.name,
                email: form.email,
                createdAt: new Date()
            });

            navigate("/login");

        } catch (err) {
            setError(err.message);
        }
    };

    /* ── Google Register ── */
    const handleGoogle = async () => {
    setError("");
    setLoading(true);

    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);

        console.log("Google user:", result.user);

        navigate("/services");

    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

    return (
        <div>

            {/* NAVBAR */}
            <nav className="navbar">
                <Link to="/" className="logo">Servi<span>fy</span></Link>
                <div className="nav-actions">
                    <Link to="/login" className="btn-signin">Sign In</Link>
                </div>
            </nav>

            {/* AUTH CARD */}
            <div className="auth-wrapper">
                <div className="auth-card">
                    <div className="auth-logo-mark">✦</div>

                    <p className="section-label">Join</p>
                    <h2 className="section-title">Create account</h2>
                    <p className="auth-sub">Start booking services in seconds.</p>

                    {error && <p className="error-msg">{error}</p>}

                    {/* Google Button — same SVG as LoginPage */}
                    <button
                        className="google-btn"
                        onClick={handleGoogle}
                        disabled={loading}
                        type="button"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57C21.36 18.45 22.56 15.63 22.56 12.25z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="divider"><span>or sign up with email</span></div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="input-group">

                        <input
                            className="input-field"
                            type="text"
                            name="name"
                            placeholder="Full name"
                            value={form.name}
                            onChange={handleChange}
                            autoComplete="name"
                        />

                        <input
                            className="input-field"
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={form.email}
                            onChange={handleChange}
                            autoComplete="email"
                        />

                        <input
                            className="input-field"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />

                        <input
                            className="input-field"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />

                        <button className="btn-primary" type="submit" disabled={loading}>
                            {loading ? "Creating account…" : "Register"}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>

                </div>
            </div>
        </div>
    );
}