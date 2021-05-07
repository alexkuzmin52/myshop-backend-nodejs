import {NextFunction, Response} from 'express';

import {ActionEnum, ResponseStatusCodeEnum} from '../../constants';
import {ICart, IProduct, IRequestExtended, IUser} from '../../models';
import {cartService, logService, productService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';
import {sumCartHelper} from '../../helpers';
import {CartType} from '../../database';

export class CartController {
  addProductToCart = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const productToCart = req.product as IProduct;
      const userCart = req.cart as ICart;
      const {_id} = req.user as IUser;

      const index = userCart.products.findIndex((v) => {
        return v.productID.toString() === productToCart._id.toString();
      });

      if (index !== -1) {
        return next(new ErrorHandler(ResponseStatusCodeEnum.BAD_REQUEST,
          customErrors.BAD_REQUEST_PRODUCT_TO_CART_ALREADY_EXIST.message));
      }

      userCart.products.push({productID: productToCart._id, count: 1, sumProduct: productToCart.price, id: productToCart.id});

      userCart.amount += 1;
      userCart.sum = sumCartHelper(userCart);

      const updatedCart = await cartService.updateCart(userCart._id, userCart);

      await logService.createLog({event: ActionEnum.USER_CART_UPDATE, userId: _id, data: updatedCart});

      res.json({message: 'Product added to cart successfully', cart: updatedCart});

    } catch (e) {
      console.log(e);
      res.json(e.message);
    }
  }

  deleteProductInCart = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const productID = +req.params.productID;
      const {_id} = req.user as IUser;
      const userCart = req.cart as CartType;

      // const index = userCart.products.findIndex((v) => v.productID.toString() === productID);
      const index = userCart.products.findIndex((v) => v.id === productID);

      if (index === -1) {
        return next(new ErrorHandler(ResponseStatusCodeEnum.NOT_FOUND,
          customErrors.BAD_REQUEST_UPDATE_PRODUCT_IN_CART_NOT_FOUND_PRODUCT_FROM_DB.message));
      }

      userCart.products.splice(index, 1);
      userCart.amount -= 1;
      userCart.sum = sumCartHelper(userCart);

      await userCart.save();
      await logService.createLog({event: ActionEnum.USER_CART_DELETE_PRODUCT, userId: _id, data: productID});

      res.json(userCart);
    } catch (e) {
      res.json(e.message);
    }
  }

  changeCountProductInCart = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const count = req.body.count;
      // const productID = req.query.productID as string;
      const productID = +req.params.productID;

      const userCart = req.cart as CartType;

      const productFromDB = await productService.getProduct(productID);
      // console.log('productFromDB+++++++++');
      // console.log(productFromDB);
      // console.log('userCart.products888888888888888888888888');
      // console.log(userCart.products);
      if (!productFromDB) {
        return next(new ErrorHandler(ResponseStatusCodeEnum.NOT_FOUND,
          customErrors.BAD_REQUEST_UPDATE_PRODUCT_IN_CART_NOT_FOUND_PRODUCT_FROM_DB.message,
          customErrors.BAD_REQUEST_UPDATE_PRODUCT_IN_CART_NOT_FOUND_PRODUCT_FROM_DB.code));
      }

      if (productFromDB.stockCount < count) {
        return next(new Error(`Remaining products in stock ${productFromDB.stockCount} unit`));
      }

      // const index = userCart.products.findIndex(value => value.productID.toString() === productID);
      const index = userCart.products.findIndex(value => value.id === productID);

      if (index === -1) {
        return next(new ErrorHandler(ResponseStatusCodeEnum.NOT_FOUND,
          customErrors.BAD_REQUEST_ADD_PRODUCT_TO_CART_NOT_FOUND.message));
      }

      userCart.products[index].count = count;
      userCart.products[index].sumProduct = count * productFromDB.price;
      userCart.sum = sumCartHelper(userCart);
      userCart.amount = userCart.products.length;

      await userCart.save();

      res.json(userCart);

    } catch (e) {
      return next(e.message);
    }
  }

  getPopulatedUserCart = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const {_id} = req.user as IUser;
      const userCart = await cartService.getPopulatedUserCart(_id);
      res.json(userCart);
    } catch (e) {
      return next(e.message);
    }
  }
}

export const cartController = new CartController();
