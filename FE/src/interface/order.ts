export interface IOrder {
    _id: string; 
    orderItem: {
      productName: string;
      quantity: number;
      image: string;
      price: number;
      totalPrice: number;
      productId: string;
    };
    shippingAddress: {
      username: string;
      address: string;
      email: string;
      phone:  string ;
      status: string;
    };
  }
  