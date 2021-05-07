import {CartStatusEnum} from '../../constants';

export interface IProductInCart {
  productID: string;
  count: number;
  price: number;
  sumProduct: number;
  id: number;
}

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

  // products: [IProductInCart],
  userID: string;
  status: CartStatusEnum;
  amount: number;
  sum: number;
  createdAt: string;
  updatedAt: string;
}
