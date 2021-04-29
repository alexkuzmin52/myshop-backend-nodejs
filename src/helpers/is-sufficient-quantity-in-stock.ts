import {productService} from '../services';

export const isSufficientQuantityInStock = async (productID: string, count: number): Promise<void> => {
  const productFromDB = await productService.findByID(productID);
  const numberItems = productFromDB?.stockCount;

  if (numberItems && productFromDB) {
    if (numberItems < count) {
      throw new Error(`Remaining products in stock: ${numberItems} ps`);
    } else {
      productFromDB.stockCount -= count;
      await productService.updateProduct(productFromDB._id, productFromDB);
    }
  }
};

