
export interface ShippingAddress {
  city: string;
  street: string;
  phone: string;
}

export type PaymentMethodType = "cash" | "online";

export interface CheckoutData {
  address: ShippingAddress;
  paymentMethod: PaymentMethodType;
  saveAddress: boolean;
}
