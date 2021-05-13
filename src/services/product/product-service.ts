import {IProduct, IProductFilter} from '../../models';
import {ProductModel, ProductType} from '../../database';

// import {Aggregate} from 'mongoose';

export class ProductService {
  getProduct(productID: number): Promise<ProductType | null> {
    console.log(productID);

    return ProductModel.findOne({id: productID}).exec();

  }

  getProducts(): Promise<IProduct[]> {
    return ProductModel.find().exec();
  }

  createProduct(product: Partial<IProduct>): Promise<ProductType> {
    console.log('product');
    console.log(product);

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

  // findProductsByFilter(filterQuery: Partial<IProductFilter>, limit: number, page: number): Promise<IProduct[] | []> {
  //
  //   const skip = limit*(page - 1);
  //   console.log('limit***********');
  //   console.log(limit);
  //   console.log('page***********');
  //   console.log(page);
  //   console.log('skip***********');
  //   console.log(skip);
  //
  //
  //
  //   return ProductModel.aggregate([
  //     {$match: filterQuery}
  //   ]).skip(skip).limit(limit).exec();
  // }

  findProductsByFilter(filterQuery: Partial<IProductFilter>, limit: number, page: number): Promise<IProduct[] | []> {
    const skip = limit * (page - 1);

    return ProductModel.find(filterQuery).skip(skip).limit(limit).exec();
  }
}

export const productService = new ProductService();
