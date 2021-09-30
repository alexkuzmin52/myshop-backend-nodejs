import {IProduct, IProductFilter, IReview} from '../../models';
import {ProductModel, ProductType} from '../../database';

export class ProductService {
  getProduct(productID: number): Promise<ProductType | null> {
    return ProductModel.findOne({id: productID}).exec();
  }

  getProducts(): Promise<ProductType[]> {
    return ProductModel.find({}).exec();
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
    console.log('filterQuery');
    console.log(filterQuery);

    return ProductModel.find(filterQuery).skip(skip).limit(limit).exec();
  }

  updateProductByReview(productId: string, update: IReview): Promise<ProductType | null> {
    return ProductModel.findByIdAndUpdate(
      productId,
      {
        $push: {
          reviews: update
        }
      }, {new: true}
    ).exec();
  }

  removeComment(product: IProduct): Promise<ProductType | null> {
    return ProductModel.findOneAndUpdate({id: product.id}, product, {new: true}).exec();
  }

  removeCommentExt(productID: number, commentID: string): Promise<ProductType | null> {
    return ProductModel.findOneAndUpdate(
      {id: productID},
      {
        $pull:
          {reviews: {_id: commentID}}
      }, {new: true}
    ).exec();
  }

  getReviewsByProductID(productID: number): Promise<ProductType[]> {
    return ProductModel.aggregate([
      {$match: {id: productID}},
      {$project: {reviews: 1, _id: 0}}
    ]).exec();

  }

  removeAllUserComments(userID: string): Promise<ProductType[]> {
    return ProductModel.updateMany({'reviews.userID': userID},
      {
        $pull: {reviews: {userID}}
      },
      {multi: true, new: true}
    ).exec();

  }

  getProductsForUpdate(_id: string): Promise<ProductType[] | []> {
    return ProductModel.find({'reviews.userID': _id}).exec();
  }

  addProductPhotos(originalName: string, _id: string | undefined) {
    return ProductModel.findByIdAndUpdate(_id,
      {$addToSet: {photo: originalName}},{new: true});
  }

  removePhotoOfProduct(_id: Partial<IProduct>, photoTitle: string): Promise<ProductType | null> {
    return ProductModel.findByIdAndUpdate(_id,
      {$pull: {
        photo: photoTitle
      }},
      {new : true}).exec();
  }

  findCategoriesWithProducts(): Promise<string[]> {
    return ProductModel.distinct('category').exec();
  }

  findPropertyByProducts(property: string): Promise<string[]> {
    return ProductModel.distinct(property).exec();
  }
}

export const productService = new ProductService();
