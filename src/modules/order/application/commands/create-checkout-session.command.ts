import { CreateCheckoutSessionDto } from "../dtos/create-checkout-session.dto";

export class CreateCheckoutSessionCommand {
    constructor(public readonly payload: CreateCheckoutSessionDto) {}
}