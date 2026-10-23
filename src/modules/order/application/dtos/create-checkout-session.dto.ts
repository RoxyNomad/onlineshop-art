export interface CreateCheckoutSessionItemDto {
    artworkId: string;
    title: string;
    imageUrl?: string;
    priceInCents: number; // Stripe rechnet in Cents (z. B. 10000 = 100.00 EUR/CHF)
    quantity: number;
}

export interface CreateCheckoutSessionDto {
    userId: string;
    customerEmail: string;
    items: CreateCheckoutSessionItemDto[];
}