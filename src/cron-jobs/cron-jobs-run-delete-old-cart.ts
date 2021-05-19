import * as cron from 'node-cron';
import * as dayjs from 'dayjs';

import {CartModel} from '../database';
import {CartStatusEnum} from '../constants';
import {cartService} from '../services';

export const CronJobsRunDeleteOldCart = () => {
  cron.schedule('0 0 * * 1', async () => {
    console.log('CRON RUN DELETE OLD CART');
    const deletedCarts = await CartModel.find({
      status: CartStatusEnum.IN_PROGRESS,
      updatedAt: {
        $lte: dayjs(new Date()).subtract(1, 'week').format()
      }
    });

    if (deletedCarts.length) {
      for (const deletedCart of deletedCarts) {
        await cartService.deleteUserCart(deletedCart._id);
      }
    }
    console.log('CRON STOP DELETE OLD CART');
  });
};
