export interface User {
  id: string;
  email: string;
  name: string | null;
}

export async function fetchCurrentUser(email: string): Promise<User | null> {
  try {
    const res = await fetch(`/api/user?email=${encodeURIComponent(email)}`);
    if (!res.ok) return null;

    const user = await res.json();
    return user;
  } catch (err) {
    console.error("Error fetching current user:", err);
    return null;
  }
}