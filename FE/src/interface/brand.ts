import { IProduct } from "./product";

export interface IBrand {
  _id?: string | number;
  name: string;
  products?: IProduct[];
  createdAt?: string;
  updatedAt?: string;
}
