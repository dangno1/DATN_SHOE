export default interface IReview {
  _id?: string | number;
  stars?: number;
  content?: string;
  productId?: string;
  userId?: string;
  createdAt?: string;
}
