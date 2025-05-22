type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  slug: string;
  category: ProductCategory;
  createdAt: string;
  updatedAt: string;
};

type ProductCategory = {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt?: string;
  updatedAt?: string;
};

type Cart = { id: number; quantity: number }[];

type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
};

type UserProfile = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
};

export {
  type Product,
  type ProductCategory,
  type User,
  type UserProfile,
  type Cart,
};
