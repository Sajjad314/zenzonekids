export interface ITableListResponse {
  _id: string;
  tableNumber: number;
  customerName: string;
  itemsOrdered: {
    itemId: string;
    quantity: number;
    name: string;
    price:number;
  }[];
  totalAmount: number;
  createdAt: string;
}
