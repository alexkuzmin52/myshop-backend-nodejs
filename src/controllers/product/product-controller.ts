import {NextFunction, Request, Response} from 'express';

import {logService, productService} from '../../services';
import {IProduct, IProductFilterQuery, IRequestExtended, IUser} from '../../models';
import {customErrors, ErrorHandler} from '../../errors';
import {ActionEnum, ResponseStatusCodeEnum} from '../../constants';
import {csvParserHelper, ProductQueryBuilder} from '../../helpers';

// import {csvParserHelper} from "../../helpers";

export class ProductController {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    console.log(req.ip);
    try {
      const allProducts = await productService.getProducts();
      res.json(allProducts);
    } catch (e) {
      next(e);
    }
  }

  async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.getProduct(+req.params.productID);

      if (!product) {
        next(new ErrorHandler(ResponseStatusCodeEnum.BAD_REQUEST,
          customErrors.BAD_REQUEST_GET_PRODUCT.message));
      }

      res.json(product);
    } catch (e) {
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
      const updatedProduct = await productService.updateProduct(+req.params.productID, req.body);

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
      const deletedProduct = await productService.deleteProduct(+req.params.productID);

      res.json(deletedProduct);
    } catch (e) {
      next(e);
    }
  }

  async addProductSinglePhoto(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const product = await productService.updateProduct(+req.params.productID, req.body);
      res.json(product);
    } catch (e) {
      next(e);
    }
  }

  getProductsByFilter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.query.limit) {
        req.query.limit = '20';
      }
      if (!req.query.page) {
        req.query.page = '1';
      }
      // const limit = req.query.limit?req.query.limit:'20';
      // const page = req.query.page?req.query.page:'1';
      // const {limit=1, page=1} =req.query;
      // let limit:string
      // req.query.limit?limit=req.query.limit:limit=20
      // const limit = req.query.limit;
      // const page = req.query.page;

      console.log('filter****************');
      console.log(req.query);
      const filterQuery = ProductQueryBuilder(req.query as Partial<IProductFilterQuery>);
      console.log('filterQuery$$$$$$$$$$');
      console.log(filterQuery);
      const products = await productService.findProductsByFilter(filterQuery, +req.query.limit, +req.query.page);
      if (products.length) {
        res.json(products);
      } else {
        return next(new ErrorHandler(ResponseStatusCodeEnum.NOT_FOUND,
          customErrors.NOT_FOUND.message));
      }
    } catch (e) {
      next(e);
    }
  }

  createProductFromCSV = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const csvFilePath = 'public/product/csv/KeysProduct.csv';
      const productArray = await csvParserHelper(csvFilePath);

      for (const product of productArray) {
        const {title} = product as Partial<IProduct>;
        const productByTitle = await productService.findOneByProperty({title});

        if (productByTitle) {
          return next(new ErrorHandler(
            ResponseStatusCodeEnum.BAD_REQUEST,
            customErrors.BAD_REQUEST_PRODUCT_TITLE.message,
            customErrors.BAD_REQUEST_PRODUCT_TITLE.code
          ));
        }
        await productService.createProduct(product as Partial<IProduct>);
      }
      const products = await productService.getProducts();
      res.json(products);
    } catch (e) {
      return next(e);
    }

  }
}

export const productController = new ProductController();
