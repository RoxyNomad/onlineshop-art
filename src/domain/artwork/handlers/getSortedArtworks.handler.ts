import { supabase } from '@/src/infrastructure/utils/neonClient';
import { GetSortedArtworksQuery } from '../getSortedArtworks.query';
import { Artwork } from '@/domain/artworks/entities/artworks.entity';

export class GetSortedArtworksHandler {
  // Executes the query based on the sort option
  async execute(query: GetSortedArtworksQuery): Promise<Artwork[]> {
    let orderByColumn = 'created_at';
    let orderDirection: 'asc' | 'desc' = 'desc';

    // Determine sorting behavior based on the given option
    switch (query.sortOption) {
      case 'Preis aufsteigend':
        orderByColumn = 'price';
        orderDirection = 'asc';
        break;
      case 'Preis absteigend':
        orderByColumn = 'price';
        orderDirection = 'desc';
        break;
      default:
        orderByColumn = 'created_at';
        orderDirection = 'desc';
    }

    // Perform database query using Supabase
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .order(orderByColumn, { ascending: orderDirection === 'asc' });

    if (error) throw new Error(`Error fetching artworks: ${error.message}`);

    return data as Artwork[];
  }
}