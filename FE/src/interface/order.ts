export interface IOrder {
  orderTime: string | number | Date;
  _id: string | number | undefined;
  userName: string;
  userEmail: string;
  userAddress: string;
  userPhone: number;
  products: {
    productName: string;
    productInitialPrice: number;
    productPrice: number;
    productImage: string;
    productColor: string;
    productSize: number;
    productQuantity: number;
    productID?: string;
  }[];
  orderCode: string;
  status: string;
  totalPrice: number;
}
