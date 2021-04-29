import {CartStatusEnum} from '../../constants';

export interface IProductInCart {
  productID: string;
  count: number;
  price: number;
  sumProduct: number;
}

export interface ICart {
  _id: string,
  products: [
    {
      productID: string,
      count: number,
      sumProduct: number
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
