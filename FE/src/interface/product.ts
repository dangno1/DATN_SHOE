export interface IProduct {
  _id?: string | number;
  name: string;
  image: string;
  thumbnail: string;
  desc: string;
  brand: string;
  categoryId: string;
  variants: {
    size: number;
    color: string;
    price: number;
    quantity: number;
    status: number;
  }[];
}
