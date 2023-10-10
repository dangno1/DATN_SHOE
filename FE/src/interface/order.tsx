export interface IOrder {
    orderItem: {
      name: string,
      quantity: number,
      image: string,
      price: number,
      totalPrice: number,
      productId: string,
    };
    shippingAddress: {
      name: string;
      address: string;
      email: string;
      phone: number;
    }
  
  }
  
  
  