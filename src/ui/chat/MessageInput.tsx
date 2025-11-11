"use client";

import { useState } from "react";
import styles from "@/styles/modules/artists/messages.module.scss";

interface MessageInputProps {
  onSend: (message: string) => void; // Command-Handler aus Container
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return; // Kein Leertext senden
    onSend(text);             // Command auslösen
    setText("");              // Eingabefeld leeren
  };

  return (
    <div className={styles.messageField}>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ihre Nachricht..."
      ></textarea>
      <button className={styles.sendButton} onClick={handleSend}>
        Senden
      </button>
    </div>
  );
}
