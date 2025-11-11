import { AuthRepository } from "@/infrastructure/repositories/auth.repository";
import { RegisterUserCommand } from "@/domain/auth/commands/registerUser.command";
import { LoginUserCommand } from "@/domain/auth/commands/loginUser.command";
import { GetUserQuery } from "@/domain/auth/queries/getUser.query";

const repo = new AuthRepository();

export async function registerUser(
    email: string,
    password: string,
    name: string,
    userType: "customer" | "artist",
    artistName?: string,
    portfolioUrl?: string
) {
    const command = new RegisterUserCommand(repo);
    return await command.execute(email, password, name, userType, artistName, portfolioUrl);
}

export async function loginUser(email: string, password: string) {
    const command = new LoginUserCommand(repo);
    return await command.execute(email, password);
}

export async function getUserFromToken(token: string) {
    const query = new GetUserQuery(repo);
    return await query.execute(token);
}