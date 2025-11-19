"use client";

import { useState } from "react";
import styles from '@/ui/styles/components/register.module.scss';

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

        if (password !== confirmPassword) {
            setError("Passwörter stimmen nicht überein");
            return;
        }

        const response = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                name,
                userType,
                artistName: userType === "artist" ? artistName : undefined,
                portfolioUrl: userType === "artist" ? portfolioUrl : undefined
            })
        });

        const result = await response.json();

        if (!response.ok) {
            setError(result.error);
            return;
        }

        setSuccess("Registrierung erfolgreich!");
    };

    return (
        <div className={styles.formContainer}>
            {/* ... dein Formular unverändert ... */}
        </div>
    );
};

export default RegisterForm;
