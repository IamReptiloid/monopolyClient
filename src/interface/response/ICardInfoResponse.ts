export interface ICardInfoResponse {
    title: string,
    type: string,
    sphere: string,
    fines: number[],
    price: number,
    sale_price: number,
    star_price: number | null,
    ownerName: string,
    collectionNumber: number
}