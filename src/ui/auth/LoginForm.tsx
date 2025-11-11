'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/infrastructure/services/auth.service"; // ruft LoginUserCommand auf
import styles from "@/src/styles/components/login.module.scss";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { user, error } = await loginUser(email, password);
            if (error) {
                setError(error);
                return;
            }

            if (!user?.userType) {
                setError("Fehler: Nutzertyp nicht gefunden.");
                return;
            }

            switch (user.userType) {
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
            setError(err instanceof Error ? err.message : "Ein unerwarteter Fehler ist aufgetreten.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2 className={styles.loginTitle}>Login</h2>
            {error && <p className={styles.errorText}>{error}</p>}

            <form onSubmit={handleLogin} className={styles.loginForm}>
                <div className={styles.formRow}>
                    <label>E-Mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formRow}>
                    <label>Passwort</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Lädt..." : "Einloggen"}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
