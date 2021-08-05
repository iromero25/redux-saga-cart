export interface User {
  id?: string;
  name?: string;
  country?: string;
  address1?: string;
  phone?: number;
}

export interface Item {
  id: string;
  quantity: number;
}

export interface ItemDetail {
  id: string;
  name: string;
  description: string;
  usd: number;
  cad: number;
  img: string;
  quantityAvailable: number;
  weight: number;
}
