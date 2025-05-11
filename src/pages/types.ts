type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  slug: string;
  category: {
    id: number;
    name: string;
    slug: string;
    image: string;
  };
  createdAt: string;
  updatedAt: string;
};

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

export { type Product, type User };
