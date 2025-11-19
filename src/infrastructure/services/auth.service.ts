import { AuthRepository } from "@/infrastructure/repositories/auth.repository";
import { RegisterUserCommand } from "@/domain/auth/commands/registerUser.command";
import { RegisterUserHandler } from "@/domain/auth/handlers/registerUser.handler";
import { LoginUserCommand } from "@/domain/auth/commands/loginUser.command";
import { LoginUserHandler } from "@/domain/auth/handlers/loginUser.handler";

const repo = new AuthRepository();

export async function registerUserService(
  email: string,
  password: string,
  name: string,
  userType: "customer" | "artist",
  artistName?: string,
  portfolioUrl?: string
) {
  const command = new RegisterUserCommand({
    email,
    password,
    name,
    userType,
    artistName,
    portfolioUrl,
  });

  const handler = new RegisterUserHandler(repo);
  return await handler.execute(command);
}

export async function loginUserService(email: string, password: string) {
  const command = new LoginUserCommand(email, password);
  const handler = new LoginUserHandler(repo);
  return await handler.execute(command);
}
