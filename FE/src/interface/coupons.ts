export interface ICoupons {
  _id?: string | number;
  code: string;
  discountValue: number;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
}
