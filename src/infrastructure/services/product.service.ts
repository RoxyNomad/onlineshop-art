import prisma from "@/infrastructure/providers/db/db";


export class ProductService {
  async getAllProducts() {
    return prisma.product.findMany({
      orderBy: { name: "asc" },
      include: {
        artist: true,
      },
    });
  }

  async getProductById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: { artist: true },
    });
  }

  async getProductsByArtist(artistId: number) {
    return prisma.product.findMany({
      where: { artistId },
      include: { artist: true },
    });
  }

  async createProduct(data: {
    name: string;
    price: number;
    imageUrl: string;
    artistId: number;
    description?: string;
  }) {
    return prisma.product.create({
      data,
    });
  }

  async updateProduct(id: string, data: Partial<{
    name: string;
    price: number;
    imageUrl: string;
    artistId: number;
    description: string;
  }>) {
    return prisma.product.update({
      where: { id },
      data,
    });
  }

  async deleteProduct(id: string) {
    return prisma.product.delete({
      where: { id },
    });
  }
}