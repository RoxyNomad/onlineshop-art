import { pool } from "@/src/lib/db";

export class ChatRepository {
    async saveMessage(senderId: string, receiverId: string, message: string) {
        const { rows } = await pool.query(
            "INSERT INTO messages (sender_id, receiver_id, message, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
            [senderId, receiverId, message]
        );
        return rows[0];
    }

    async getMessagesBetween(userId: string, contactId: string) {
        const { rows } = await pool.query(
            `SELECT * FROM messages
       WHERE (sender_id = $1 AND receiver_id = $2) 
          OR (sender_id = $2 AND receiver_id = $1)
       ORDER BY created_at ASC`,
            [userId, contactId]
        );
        return rows;
    }

    async markAsRead(senderId: string, receiverId: string) {
        await pool.query(
            "UPDATE messages SET is_read = TRUE WHERE sender_id = $1 AND receiver_id = $2",
            [senderId, receiverId]
        );
    }
}