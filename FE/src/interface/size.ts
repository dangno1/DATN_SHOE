import { IProduct } from "./product";

export interface ISize {
  _id?: string | number;
  value: number;
  products?: IProduct[];
  createdAt?: string;
  updatedAt?: string;
}
