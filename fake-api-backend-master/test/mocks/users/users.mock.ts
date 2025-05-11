import { User, Role } from '../../../src/models/payload.model';

export const USERS_MOCK: User[] = [
  {
    id: 1,
    email: 'john@mail.com',
    password: 'changeme',
    name: 'Jhon',
    role: Role.customer,
    avatar: '',
  },
  {
    id: 2,
    email: 'maria@mail.com',
    password: '12345',
    name: 'Maria',
    role: Role.customer,
    avatar: '',
  },
  {
    id: 3,
    email: 'admin@mail.com',
    password: 'admin123',
    name: 'Admin',
    role: Role.admin,
    avatar: '',
  },
];
