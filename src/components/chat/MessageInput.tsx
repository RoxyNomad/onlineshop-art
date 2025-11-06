import { useState } from "react";
import styles from "@/src/styles/modules/artists/messages.module.scss";

interface MessageInputProps {
  onSend: (message: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
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
