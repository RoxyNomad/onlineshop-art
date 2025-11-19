import prisma from "@/infrastructure/providers/db/db";
import { NoveltiesEntity } from "../entities/novelties.entity";
import { FilterNoveltiesDTO } from "../dtos/novelties.dto";

export class NoveltiesRepository {
  static async findByFilter(
    filters: FilterNoveltiesDTO
  ): Promise<NoveltiesEntity[]> {
    const where: any = {};
    if (filters.artistId) where.artistId = Number(filters.artistId);

    const rows = await prisma.artwork.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { artist: true },
    });

    return rows.map(
      (r) =>
        new NoveltiesEntity(
          r.id,
          r.name,
          r.imageUrl,
          r.price,
          r.createdAt,
          r.artist?.artistName ?? "Unknown"
        )
    );
  }
}
