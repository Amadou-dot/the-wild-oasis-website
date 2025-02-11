export type Cabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  imageURL: string;
  description: string;
};


export type CabinPrice = {
  regularPrice: number;
  discount: number;
}