import { IProduct } from "./product";

export interface IColor {
  _id?: string | number;
  value: string;
  products?: IProduct[];
  createdAt?: string;
  updatedAt?: string;
}
