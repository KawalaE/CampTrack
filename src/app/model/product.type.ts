import { Campaign } from './campaign.type';

export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  campaigns?: Campaign[];
};
