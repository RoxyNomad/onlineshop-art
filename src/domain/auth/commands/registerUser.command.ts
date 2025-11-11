// src/server/application/auth/commands/register-user.command.ts
import { AuthRepository } from "@/infrastructure/repositories/auth.repository";
import { User } from "@/domain/auth/entities/user.entity";
import { Artist } from "@/domain/auth/entities/artist.entity";
import { Password } from "@/domain/auth/valueObjects/password.vo";

export class RegisterUserCommand {
    constructor(private readonly repo: AuthRepository) {}

    async execute(
        email: string,
        password: string,
        name: string,
        userType: "customer" | "artist",
        artistName?: string,
        portfolioUrl?: string
    ) {
        const existing = await this.repo.findByEmail(email);
        if (existing) {
            return { user: null, error: "Ein Benutzer mit dieser E-Mail existiert bereits." };
        }

        const passwordVO = await Password.create(password);
        const user = new User("", name, email, userType);
        const newUser = await this.repo.createUser(user, passwordVO.value);

        if (userType === "artist") {
            const artist = new Artist(newUser.id, artistName, portfolioUrl);
            await this.repo.createArtist(artist);
        }

        return { user: newUser, error: null };
    }
}
