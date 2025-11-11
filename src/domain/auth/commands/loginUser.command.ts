import { AuthRepository } from "@/infrastructure/repositories/auth.repository";
import { Password } from "@/domain/auth/valueObjects/password.vo";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export class LoginUserCommand {
    constructor(private readonly repo: AuthRepository) {}

    async execute(email: string, password: string) {
        const storedHash = await this.repo.getPasswordHash(email);
        if (!storedHash) return { error: "Benutzer nicht gefunden." };

        const passwordVO = Password.fromHash(storedHash);
        const isMatch = await passwordVO.compare(password);
        if (!isMatch) return { error: "Falsches Passwort." };

        const user = await this.repo.findByEmail(email);
        if (!user) return { error: "Benutzer konnte nicht geladen werden." };

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
        return { token, user };
    }
}