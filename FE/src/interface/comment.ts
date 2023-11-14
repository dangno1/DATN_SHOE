export interface IComment {
  _id: string | number;
  ProductID: string;
  UserID: string;
  CommentContent: string;
  DatePosted: Date;
}