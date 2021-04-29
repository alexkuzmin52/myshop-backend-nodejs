// import {cartService} from "../services";
import {CartModel} from '../database';
import {CartStatusEnum} from '../constants';
import dayjs from 'dayjs';
// import {cartService} from '../services';
// import {ICart} from '../models';

export const deleteOldCart =async () => {
  console.log('*****************************************************deleteOldCart');

  const deletedCarts = await CartModel.find({
    status: CartStatusEnum.IN_PROGRESS,
    updatedAt: {
      $lte: dayjs(new Date()).subtract(1, 'minute').format()
    }
  });
  console.log(deletedCarts);
  // if (deletedCarts.length) {
  //   for (const deletedCart of deletedCarts) {
  //     await cartService.deleteUserCart(deletedCart._id);
  //   }
  // }
  //
};
