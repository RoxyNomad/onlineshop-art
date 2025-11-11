'use client';

import { useState } from "react";
import { registerUser } from "@/infrastructure/services/auth.service"; // ruft dein RegisterUserCommand auf
import styles from '@/src/styles/components/register.module.scss';

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [userType, setUserType] = useState<"customer" | "artist">("customer");
    const [artistName, setArtistName] = useState("");
    const [portfolioUrl, setPortfolioUrl] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Passwort überprüfen
        if (password !== confirmPassword) {
            setError("Passwörter stimmen nicht überein");
            return;
        }

        let formattedPortfolioUrl = portfolioUrl.trim();
        if (userType === "artist" && formattedPortfolioUrl && !/^https?:\/\//i.test(formattedPortfolioUrl)) {
            formattedPortfolioUrl = `https://${formattedPortfolioUrl}`;
        }

        try {
            // Call CQRS Command via Service
            const { error } = await registerUser(
                email,
                password,
                name,
                userType,
                userType === "artist" ? artistName : undefined,
                userType === "artist" ? formattedPortfolioUrl : undefined
            );

            if (error) throw new Error(error);

            setSuccess("Registrierung erfolgreich!");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setName("");
            setArtistName("");
            setPortfolioUrl("");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten.");
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.registerTitle}>Registrieren</h2>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}

            <form onSubmit={handleSubmit} className={styles.form}>
                {/* User Type */}
                <div className={styles.userTypeSelection}>
                    <label>
                        <input
                            type="radio"
                            value="customer"
                            checked={userType === 'customer'}
                            onChange={() => setUserType('customer')}
                        />
                        Kunde
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="artist"
                            checked={userType === 'artist'}
                            onChange={() => setUserType('artist')}
                        />
                        Künstler
                    </label>
                </div>

                {/* Name */}
                <div className={styles.formRow}>
                    <label className={styles.title}>
                        Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </label>
                </div>

                {/* Email */}
                <div className={styles.formRow}>
                    <label className={styles.title}>
                        E-Mail
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </label>
                </div>

                {/* Password */}
                <div className={styles.formRow}>
                    <label className={styles.title}>
                        Passwort
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </label>
                </div>

                {/* Confirm Password */}
                <div className={styles.formRow}>
                    <label className={styles.title}>
                        Passwort bestätigen
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </label>
                </div>

                {/* Artist Fields */}
                {userType === "artist" && (
                    <>
                        <div className={styles.formRow}>
                            <label className={styles.title}>
                                Künstlername
                                <input
                                    type="text"
                                    value={artistName}
                                    onChange={(e) => setArtistName(e.target.value)}
                                    required
                                    className={styles.input}
                                />
                            </label>
                        </div>

                        <div className={styles.formRow}>
                            <label className={styles.title}>
                                Portfolio-URL
                                <div className={styles.portfolioField}>
                                    <span>https://</span>
                                    <input
                                        type="text"
                                        value={portfolioUrl.replace(/^https?:\/\//, "")}
                                        onChange={(e) => setPortfolioUrl(e.target.value)}
                                        required
                                        className={styles.input}
                                    />
                                </div>
                            </label>
                        </div>
                    </>
                )}

                <button type="submit" className={styles.submitButton}>
                    Registrieren
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
