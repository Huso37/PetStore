/**
 * Swagger Petstore - OpenAPI 3.0
 *
 * Contact: apiteam@swagger.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface Order { 
    id?: number;
    petId?: number;
    quantity?: number;
    shipDate?: string;
    /**
     * Order Status
     */
    status?: Order.StatusEnum;
    complete?: boolean;
}
export namespace Order {
    export const StatusEnum = {
        Placed: 'placed',
        Approved: 'approved',
        Delivered: 'delivered'
    } as const;
    export type StatusEnum = typeof StatusEnum[keyof typeof StatusEnum];
}


