export interface IProduct {
  _id?: string | number;
  name: string;
  image: string;
  thumbnail: string[];
  desc: string;
  brand: string;
  categoryId: string;
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
