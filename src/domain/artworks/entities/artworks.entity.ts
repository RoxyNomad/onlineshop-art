export class ArtworksEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly image_url: string,
    public readonly price: number,
    public readonly base_color: string,
    public readonly category_id: string,
    public readonly created_at: Date
  ) {}
}