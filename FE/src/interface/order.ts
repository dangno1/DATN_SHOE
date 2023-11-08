export interface IOrder {
    _id: string | number | undefined; 
  userName: string,
  userEmail: string,
  userAddress: string,
  userPhone:  string,
  products: {
    productName: string,
    productInitialPrice: string,
    productPrice: string,
    productImage: string,
    productColor: string,
    productSize: number,
    productQuantity: number
  }[],
  orderCode: string,
  status: string
  }
  