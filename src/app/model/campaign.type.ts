export type Campaign = {
  id: number;
  productId: number;
  name: string;
  keywords: string[];
  bid: number;
  fund: number;
  status: boolean;
  town: string;
  radius: number;
};
