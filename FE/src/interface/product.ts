export interface IProduct {
  _id?: string | number;
  name: string;
  image: File[];
  thumbnail: File[];
  desc: string;
  brand: string;
  categoryId: string;
  isDelete: boolean;
  createdAt:string;
  updatedAt: string;
  variants: {
    sizeId: string;
    colorId: string;
    price: number;
    discount: number;
    amountSold: number;
    quantity: number;
    status: number;
  }[];
}
