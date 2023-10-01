export interface IProduct {
  _id?: string | number;
  name: string;
  image: FileList;
  images: FileList[];
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
