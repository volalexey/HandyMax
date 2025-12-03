export class CreateOrderItemDto {
    serviceId: number;
    quantity: number;
}

export class CreateOrderDto {
    items: CreateOrderItemDto[];
}
