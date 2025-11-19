import prisma from "@/infrastructure/providers/db/db";


export class CategoryService {
  async getAllCategories() {
    return prisma.category.findMany({
      orderBy: { name: "asc" }
    });
  }

  async createCategory(name: string) {
    return prisma.category.create({
      data: { name }
    });
  }
}