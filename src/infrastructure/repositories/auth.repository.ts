import prisma from "@/infrastructure/providers/db/db";
import { User } from "@/domain/auth/entities/user.entity";
import { Artist } from "@/domain/auth/entities/artist.entity";

export class AuthRepository {

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) return null;

        return new User(user.id, user.name, user.email, user.user_type as any);
    }

    async getPasswordHash(email: string): Promise<string | null> {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { password_hash: true }
        });

        return user?.password_hash ?? null;
    }

    async createUser(user: User, passwordHash: string): Promise<User> {
        const created = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password_hash: passwordHash,
                user_type: user.userType
            }
        });

        return new User(created.id, created.name, created.email, created.user_type as any);
    }

    async createArtist(artist: Artist): Promise<Artist> {
        await prisma.artist.create({
            data: {
                id: artist.id,
                artist_name: artist.artistName,
                portfolio_url: artist.portfolioUrl
            }
        });
        return artist;
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) return null;

        return new User(user.id, user.name, user.email, user.user_type as any);
    }
}
