"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/ui/styles/components/login.module.scss";

const LoginForm: React.FC = () => {
    // Local form state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    /**
     * Handles the login form submission
     */
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Call the backend API (not the service!)
            const response = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            // Handle API errors
            if (!response.ok) {
                setError(result.error || "Login failed");
                return;
            }

            const { user } = result;

            if (!user?.userType) {
                setError("Could not determine user role.");
                return;
            }

            // Redirect based on user type
            switch (user.userType) {
                case "artist":
                    router.push("/artist/artistDashboard");
                    break;
                case "customer":
                    router.push("/customer/shop");
                    break;
                default:
                    setError("Invalid user type.");
                    break;
            }

        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unexpected error occurred."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2 className={styles.loginTitle}>Login</h2>

            {/* Error display */}
            {error && <p className={styles.errorText}>{error}</p>}

            <form onSubmit={handleLogin} className={styles.loginForm}>

                {/* Email field */}
                <div className={styles.formRow}>
                    <label>E-Mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Password field */}
                <div className={styles.formRow}>
                    <label>Passwort</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Submit button */}
                <button type="submit" disabled={loading}>
                    {loading ? "Lädt..." : "Einloggen"}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
