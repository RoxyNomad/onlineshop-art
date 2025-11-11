export class WishlistItem {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public artworkId: string,
    public artworkName: string
  ) {}
}
