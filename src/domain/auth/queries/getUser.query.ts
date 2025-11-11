import { AuthRepository } from "@/infrastructure/repositories/auth.repository";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export class GetUserQuery {
    constructor(private readonly repo: AuthRepository) {}

    async execute(token: string) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
            return await this.repo.findById(decoded.userId);
        } catch {
            return null;
        }
    }
}