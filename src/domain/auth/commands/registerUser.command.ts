export interface RegisterUserRequest {
  email: string;
  password: string;
  name: string;
  userType: "customer" | "artist";
  artistName?: string;
  portfolioUrl?: string;
}

export class RegisterUserCommand {
  constructor(public readonly data: RegisterUserRequest) {}
}
