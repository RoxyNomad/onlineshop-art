export class NoveltyEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly image_url: string,
    public readonly price: number,
    public readonly created_at: Date
  ) {}
}
