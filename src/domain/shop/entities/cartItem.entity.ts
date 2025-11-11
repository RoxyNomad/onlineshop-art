export class CartItem {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public artworkId: string,
    public artworkName: string,
    public price: number,
    public quantity: number,
    public totalPrice: number,
    public sizeId?: string,
    public frameId?: string
  ) {}
}
