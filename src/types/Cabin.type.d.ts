export interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  imageURL: string;
  description: string;
}

export interface CabinPrice {
  regularPrice: number;
  discount: number;
}
