export type AuthForm = {
  email: string;
  password: string;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  uid: string;
  rank: number;
};

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

export type EditedTask = {
  id: number;
  title: string;
  description?: string | null | undefined;
};

export type Task = {
  id: number;
  title: string;
};
