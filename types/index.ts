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

export type Repair = {
  id: string;
  profiles: {
    id: string;
    username: string;
  };
  factories: {
    id: string;
    name: string;
  };
  customer: string;
  deadline: string;
  deliveryPlace: string;
  comment: string;
  repair_contents:
    | {
        id: string;
        title: string;
        price: any;
        path: string;
        is_new: boolean;
      }
    | {
        id: string;
        title: string;
        price: any;
        path: string;
        is_new: boolean;
      }[]
    | null;
  repair_details:
    | {
        id: string;
        maker: string;
        product_name: string;
        size: string;
        quantity: any;
        comment: string;
      }
    | {
        id: string;
        maker: string;
        product_name: string;
        size: string;
        quantity: any;
        comment: string;
      }[]
    | null;
};

export type RepairInputs = {
  factories: {
    id: string;
    name: string;
  };
  deliveryPlace: string;
  deadline: string;
  customer: string;
  repair_contents: {
    id: string;
    title: string;
    price: any;
    image_url: string;
    is_new: boolean;
  }[];

  repair_details: {
    id: string;
    maker: string;
    product_name: string;
    size: string;
    quantity: any;
    comment: string;
  }[];
  comment: string;
  user_id: string | undefined;
  status: 'PICKING' | 'DIRECT';
};

export type TemplateInputs = {
  factory_id: string;
  category_id: string;
  tag: string;
  price: number;
  title: string;
  comment: string;
  image_url: string | null | undefined;
};

export type Factory = {
  id: string;
  name: string;
  updated_at: string | null;
  created_at: string;
};

export type Customer = {
  id: string;
  name: string;
  code: number;
  updated_at: string | null;
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  updated_at: string | null;
  created_at: string;
};

export type Task = {
  id: number;
  title: string;
};
