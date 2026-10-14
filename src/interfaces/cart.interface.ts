

export interface CartProduct {
  id: string;
  title: string;
  price: number;
  imageCover: string;
  category?: string;
  priceAfterDiscount?: number;
}

export interface CartItem extends CartProduct {
  quantity: number;
}
