export class GetSortedArtworksQuery {
  constructor(
    public readonly sortOption: 'Neueste' | 'Preis aufsteigend' | 'Preis absteigend'
  ) {}
}
