import {IProduct} from '../models';

export const ChangeStockCountProduct = (productFromDB: IProduct, poductFromCartCount: number): void => {
  productFromDB.stockCount -= poductFromCartCount;
};
//TODO
