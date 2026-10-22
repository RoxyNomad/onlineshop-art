// src/app/api/auth/[...all]/route.ts
import { auth } from "@/shared/infrastructure/auth/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Leitet alle HTTP GET & POST Anfragen an deine auth.ts weiter
export const { GET, POST } = toNextJsHandler(auth);