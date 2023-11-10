import { IProduct } from "./product";

export interface ICategory {
  _id?: string | number;
  name: string;
  products?: IProduct[];
  createdAt?: string;
  updatedAt?: string;
}
