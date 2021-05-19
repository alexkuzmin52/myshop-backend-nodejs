import {CartStatusEnum} from '../../constants';

export interface ICart {
  _id: string,
  products: [
    {
      productID: string,
      count: number,
      sumProduct: number,
      id: number
    }
  ],

  userID: string;
  status: CartStatusEnum;
  amount: number;
  sum: number;
  createdAt: string;
  updatedAt: string;
}
