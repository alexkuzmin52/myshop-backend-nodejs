import {CartModel} from '../database';
import {CartStatusEnum} from '../constants';
import dayjs from 'dayjs';

export const deleteOldCart = async () => {
  const deletedCarts = await CartModel.find({
    status: CartStatusEnum.IN_PROGRESS,
    updatedAt: {
      $lte: dayjs(new Date()).subtract(1, 'minute').format()
    }
  });
  console.log(deletedCarts);
};
