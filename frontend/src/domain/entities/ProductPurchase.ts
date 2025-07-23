export interface ProductPurchase {
  id: number;
  supplierId: number;
  pieceId: number;
  quantity: number;
  value: number;
  date: Date;
}
