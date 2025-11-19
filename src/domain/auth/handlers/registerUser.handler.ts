import { RegisterUserCommand } from "../commands/registerUser.command";
import { AuthRepository } from "@/infrastructure/repositories/auth.repository";
import { Password } from "@/domain/auth/valueObjects/password.vo";
import { User } from "@/domain/auth/entities/user.entity";
import { Artist } from "@/domain/auth/entities/artist.entity";

export class RegisterUserHandler {
  constructor(private readonly repo: AuthRepository) {}

  async execute(command: RegisterUserCommand) {
    const { email, password, name, userType, artistName, portfolioUrl } = command.data;

    const existing = await this.repo.findByEmail(email);
    if (existing) throw new Error("Ein Benutzer mit dieser E-Mail existiert bereits.");

    const passwordVO = await Password.create(password);

    const user = new User("", name, email, userType);
    const newUser = await this.repo.createUser(user, passwordVO.value);

    if (userType === "artist") {
      const artist = new Artist(newUser.id, artistName, portfolioUrl);
      await this.repo.createArtist(artist);
    }

    return newUser;
  }
}
