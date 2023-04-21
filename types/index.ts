export type AuthForm = {
  email: string;
  password: string;
};

export type Profile = {
  id: string | undefined;
  updated_at: string;
  created_at: string;
  username: string | undefined;
  email: string | undefined;
  avatar_url: string | undefined;
  favorites: string | undefined;
};

export type EditedProfile = {
  username: string | undefined;
  email: string | undefined;
  avatar_url: string | undefined;
  favorites: string | undefined;
};

export type RepaireInputs = {
  factory: string;
  deliveryPlace: string;
  deadline: string | null;
  client: string;
  price: any;
  title: string;
  orderType: string;
  category: string;
  comment: string;
  products: {
    productNumber: string;
    size: string;
    quantity: any;
    comment: string;
  }[];
  user_id: string | undefined;
};

export type Factory = {
  id: string;
  name: string;
  updated_at: string;
  created_at: string;
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
