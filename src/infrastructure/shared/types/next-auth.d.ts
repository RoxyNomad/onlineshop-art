import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend User type
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // 👈 add your custom property here
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
  }
}
