// Define the user structure
export interface User {
  id: string;  // Unique identifier for the user
  name: string;  // Name of the user
  email: string;  // Email address of the user
}

// Interface for login response
export interface LoginResponse {
  user?: { id: string; email?: string; user_type?: string };  // User data if login is successful
  error?: string | null;  // Error message if login fails
}