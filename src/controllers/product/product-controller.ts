import {NextFunction, Request, Response} from 'express';
import {logService, productService} from '../../services';
// import {Mongoose, Schema, Types} from 'mongoose';
import {IRequestExtended, IUser} from '../../models';
import {customErrors, ErrorHandler} from '../../errors';
import {ActionEnum, ResponseStatusCodeEnum} from '../../constants';

export class ProductController {
  async getProducts(req: Request, res: Response, next: NextFunction) {

    try {
      const allProducts = await productService.getProducts();
      res.json(allProducts);
    } catch (e) {
      next(e);
    }
  }

  async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.getProduct(req.query.productID as string);

      if (!product){
        next(new ErrorHandler(ResponseStatusCodeEnum.BAD_REQUEST,
          customErrors.BAD_REQUEST_GET_PRODUCT.message));
      }
      res.json(product);
    } catch (e) {
      // console.log(e);
      next(e);
    }
  }

  async createProduct(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {_id} = req.user as IUser;
      // console.log(req.body);
      const newProduct = await productService.createProduct({...req.body, userID: _id});

      await logService.createLog({event: ActionEnum.USER_CREATE_PRODUCT, userId: _id, data: newProduct._id});
      res.json(newProduct);
    } catch (e) {
      next(e);
    }
  }

  async updateProduct(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const {_id} = req.user as IUser;
      const updatedProduct = await productService.updateProduct(req.query.productID as string, req.body);
      if (updatedProduct) {
        await logService.createLog({event: ActionEnum.USER_UPDATE_PRODUCT, userId: _id, data: updatedProduct._id});
      }
      res.json(updatedProduct);
    } catch (e) {
      next(e);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedProduct = await productService.deleteProduct(req.query.productID as string);
      res.json(deletedProduct);
    } catch (e) {
      next(e);
    }
  }

}
export const productController = new ProductController();
