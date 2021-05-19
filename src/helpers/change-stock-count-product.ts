import {IProduct} from '../models';

export const ChangeStockCountProduct = (productFromDB: IProduct, poductFromCartCount: number) => {
  productFromDB.stockCount -= poductFromCartCount;
};
//TODO
