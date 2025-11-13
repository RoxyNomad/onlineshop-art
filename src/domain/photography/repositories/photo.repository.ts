import { sql } from '@/infrastructure/providers/db/db';
import { PhotoEntity } from '../entities/photo.entity';

export class PhotoRepository {
  // Fetch all photos
  static async findAll(): Promise<PhotoEntity[]> {
    const rows = await sql`
      SELECT id, name, image_url, price, base_color, category_id, created_at
      FROM artworks
      ORDER BY created_at DESC;
    `;
    return rows.map((r: any) =>
      new PhotoEntity(
        r.id,
        r.name,
        r.image_url,
        r.price,
        r.base_color,
        r.category_id,
        new Date(r.created_at)
      )
    );
  }

  // Fetch photos by category
  static async findByCategory(categoryId: string): Promise<PhotoEntity[]> {
    const rows = await sql`
      SELECT id, name, image_url, price, base_color, category_id, created_at
      FROM artworks
      WHERE category_id = ${categoryId}
      ORDER BY created_at DESC;
    `;
    return rows.map((r: any) =>
      new PhotoEntity(
        r.id,
        r.name,
        r.image_url,
        r.price,
        r.base_color,
        r.category_id,
        new Date(r.created_at)
      )
    );
  }
}
