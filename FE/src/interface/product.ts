export interface IProduct {
  target: { name: any; value: any; };
  color: any;
  size: any;
  id:  | null | undefined;
  id: Key | null | undefined;
  _id?: string | number;
  name: string;
  image: string;
  thumbnail: string;
  desc: string;
  brand: string;
  categoryId: string;
  isDelete: boolean;
  updatedAt: string;
  variants: {
    size: number;
    color: string;
    price: number;
    quantity: number;
    status: number;
  }[];
}