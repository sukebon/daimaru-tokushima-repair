export type MarkInputs = {
  factory: string;
  deliveryPlace: string;
  deadline: Date | null;
  client: string;
  price: any;
  orderType: string;
  category: string;
  products: {
    productNumber: string;
    size: string;
    quantity: any;
    comment: string;
  }[];
  user_id: string | undefined;
};