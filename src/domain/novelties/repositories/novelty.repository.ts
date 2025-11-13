import { pool } from '@/infrastructure/providers/db/db';
import { NoveltyEntity } from '../entities/novelty.entity';

export class NoveltyRepository {
  static async findLatest(limit: number = 4): Promise<NoveltyEntity[]> {
    const rows = await pool.query<any>`
      SELECT id, name, image_url, price, created_at
      FROM artworks
      ORDER BY created_at DESC
      LIMIT ${limit};
    `;
    return rows.map(
      (r: any) =>
        new NoveltyEntity(r.id, r.name, r.image_url, r.price, new Date(r.created_at))
    );
  }

  static async findAll(): Promise<NoveltyEntity[]> {
    const rows = await pool.query<any>`
      SELECT id, name, image_url, price, created_at
      FROM artworks
      ORDER BY created_at DESC;
    `;
    return rows.map(
      (r: any) =>
        new NoveltyEntity(r.id, r.name, r.image_url, r.price, new Date(r.created_at))
    );
  }
}
