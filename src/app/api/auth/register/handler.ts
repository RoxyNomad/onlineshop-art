import { registerUserService } from "@/infrastructure/services/auth.service";

export async function handleRegister(data: any) {
    return await registerUserService(
        data.email,
        data.password,
        data.name,
        data.userType,
        data.artistName,
        data.portfolioUrl
    );
}
