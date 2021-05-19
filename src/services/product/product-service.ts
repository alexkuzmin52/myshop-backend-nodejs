import {IProduct, IProductFilter} from '../../models';
import {ProductModel, ProductType} from '../../database';

export class ProductService {
  getProduct(productID: number): Promise<ProductType | null> {
    return ProductModel.findOne({id: productID}).exec();
  }

  getProducts(): Promise<IProduct[]> {
    return ProductModel.find().exec();
  }

  createProduct(product: Partial<IProduct>): Promise<ProductType> {
    return new ProductModel(product).save();
  }

  updateProduct(productID: number, params: Partial<IProduct>): Promise<ProductType | null> {
    return ProductModel.findOneAndUpdate({id: productID}, params, {new: true}).exec();
  }

  deleteProduct(productID: number): Promise<any> {
    return ProductModel.findOneAndDelete({id: productID}).exec();
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

  findProductsByFilter(filterQuery: Partial<IProductFilter>, limit: number, page: number): Promise<IProduct[] | []> {
    const skip = limit * (page - 1);

    return ProductModel.find(filterQuery).skip(skip).limit(limit).exec();
  }
}

export const productService = new ProductService();
