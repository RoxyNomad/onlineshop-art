import bcrypt from "bcrypt";

export class Password {
    private constructor(private readonly hash: string) {}

    static async create(raw: string): Promise<Password> {
        const hash = await bcrypt.hash(raw, 10);
        return new Password(hash);
    }

    static fromHash(hash: string): Password {
        return new Password(hash);
    }

    async compare(raw: string): Promise<boolean> {
        return bcrypt.compare(raw, this.hash);
    }

    get value(): string {
        return this.hash;
    }
}