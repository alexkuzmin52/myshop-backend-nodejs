import {ICart} from '../models';

export const sumCartHelper = (cart: ICart): number => {
  let sum=0;
  for (const product of cart.products) {
    // sum = sum + product.price * product.count;
    sum = sum + product.sumProduct;
  }

  return sum;
};
