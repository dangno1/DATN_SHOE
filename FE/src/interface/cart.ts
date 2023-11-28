export interface ICart {
  // checked: boolean | undefined;
  _id?: string | number | undefined;
  userName: string,
  userEmail: string,
  userAddress: string,
  productName: string,
  quantity: number,
  price: number,
  initialPrice: number,
  size: number,
  totalPrice: number,
  category: string,
  image: string,
  color: string,
  status: string,
  otp?: string;
  productID: string | number | undefined;
}
