export interface IProduct {
  _id?: string | number;
  name: string;
  image: File[];
  thumbnail: File[];
  desc: string;
  brand: string;
  categoryId: string;
  isDelete: boolean;
  updatedAt?: string;
  createdAt?: string;
  variants: {
    _id?: string | number;
    sizeId: string;
    colorId: string;
    price: number;
    discount: number;
    amountSold: number;
    quantity: number;
    status: number;
  }[];
}
