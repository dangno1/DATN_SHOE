export interface IProduct {
  id?: string | number;
  name: string;
  image: string;
  images: string[];
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
