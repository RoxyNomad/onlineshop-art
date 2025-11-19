import prisma from "@/infrastructure/providers/db/db";

export class UserService {
  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        messagesReceived: true,
        messagesSent: true,
        cartItems: true
      }
    });
  }

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    });
  }
}
