import * as cron from 'node-cron';
import * as dayjs from 'dayjs';
import {OrderStatusEnum} from '../constants';
import {OrderModel} from '../database';
import {orderService} from '../services';

export const CronJobsRunDeleteOldOrder = (): void => {
  cron.schedule('*/30 * * * *', async () => {
    console.log('CRON RUN DELETE OLD ORDER');
    const deletedOrders = await OrderModel.find({
      status: OrderStatusEnum.REGISTERED,
      updatedAt: {
        $lte: dayjs(new Date()).subtract(30, 'minute').format()
      }
    });

    if (deletedOrders.length) {
      for (const deletedOrder of deletedOrders) {
        await orderService.removeOrder(deletedOrder._id);
      }
    }
    console.log('CRON STOP DELETE OLD ORDER');
  });
};
