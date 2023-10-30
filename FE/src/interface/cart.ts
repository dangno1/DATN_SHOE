export interface ICart {
  checked: boolean | undefined;
  _id?: string | number | undefined;
  userName: string;
  userAddress: string;
  productName: string;
  image: string;
  quantity: number;
  price: number;
  category: string;
  color: string;
  size: number;
}
