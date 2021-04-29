import {IProduct} from '../../models';
import {ProductModel, ProductType} from '../../database';
// import {string} from 'joi';

export class ProductService {
  getProduct(productID: string): Promise<ProductType | null> {
    return ProductModel.findById(productID).exec();
  }

  getProducts(): Promise<IProduct[]> {
    return ProductModel.find().exec();
  }

  createProduct(product: Partial<IProduct>): Promise<ProductType> {
    return new ProductModel(product).save();
  }

  updateProduct(productID: string, params: Partial<IProduct>): Promise<ProductType | null> {
    return ProductModel.findByIdAndUpdate(productID, params, {new: true}).exec();
  }

  deleteProduct(productID: string): Promise<any> {
    return ProductModel.findByIdAndDelete(productID).exec();
  }

  findOneByProperty(property: Partial<IProduct>): Promise<ProductType | null> {
    return ProductModel.findOne(property).exec();
  }

  findByID(productID: string): Promise<IProduct | null> {
    return ProductModel.findById(productID).exec();
  }

  findProductByID(productID: string): Promise<ProductType | null> {
    return ProductModel.findById(productID).exec();

  }
}

export const productService = new ProductService();
