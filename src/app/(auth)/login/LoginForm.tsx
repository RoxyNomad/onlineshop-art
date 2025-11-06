"use client"; // Mark component as a Client Component (required for hooks like useState)

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/server/services/auth.service";
import { LoginResponse } from "@/server/shared/types/user.types";
import styles from "@/src/styles/components/login.module.scss";

const LoginForm: React.FC = () => {
    // Local state for form fields and status messages
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Next.js App Router navigation hook
    const router = useRouter();

    // Handle form submission
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Call authentication service
            const response: LoginResponse = await loginUser(email, password);

            // Handle potential login errors
            if (response.error) {
                setError("Login fehlgeschlagen: " + response.error);
                return;
            }

            if (!response.user || !response.user.user_type) {
                setError("Fehler: Nutzertyp nicht gefunden.");
                return;
            }

            // Navigate based on user role
            switch (response.user.user_type) {
                case "artist":
                    router.push("/artist/artistDashboard");
                    break;
                case "customer":
                    router.push("/customer/shop");
                    break;
                default:
                    setError("Ungültiger Nutzertyp.");
                    break;
            }
        } catch (err) {
            console.error(err);
            setError("Ein unerwarteter Fehler ist aufgetreten.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2 className={styles.loginTitle}>Login</h2>

            {error && <p className={styles.errorText} aria-live="assertive">{error}</p>}

            <form onSubmit={handleLogin} className={styles.loginForm}>
                <div className={styles.formRow}>
                    <label className={styles.emailTitle}>E-Mail</label>
                    <input
                        type="email"
                        className={styles.emailInput}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formRow}>
                    <label className={styles.passwordTitle}>Passwort</label>
                    <input
                        type="password"
                        className={styles.passwordInput}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={loading}
                >
                    {loading ? "Lädt..." : "Einloggen"}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
