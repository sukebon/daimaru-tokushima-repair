export type MarkType = {
  email: string;
  password: string;
  products: {
    productNumber: string;
    size: string;
    quantity: number;
    comment: string;
  }[];
};