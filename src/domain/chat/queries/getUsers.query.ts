import { ChatUser } from "@/domain/chat/entities/chat.entity";

export async function fetchUsersQuery(): Promise<ChatUser[]> {
  const res = await fetch("/api/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}
