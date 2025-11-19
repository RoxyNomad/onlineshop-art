export class NoveltiesEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly imageUrl: string,
    public readonly price: number,
    public readonly createdAt: Date,
    public readonly artistName: string
  ) {}
}
