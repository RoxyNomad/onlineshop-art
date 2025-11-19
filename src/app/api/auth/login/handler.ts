import { loginUserService } from "@/infrastructure/services/auth.service";

export async function handleLogin(data: any) {
  return await loginUserService(data.email, data.password);
}
