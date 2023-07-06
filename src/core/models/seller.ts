import { City } from './city';
export interface Seller {
    id: number
    name: string
    lastName: string
    document: string
    cityId: number
    city: City
  }