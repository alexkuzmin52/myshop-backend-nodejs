import {NextFunction, Request, Response} from 'express';
import * as fs from 'fs-extra';
import * as path from 'path';

import {ActionEnum, ResponseStatusCodeEnum} from '../../constants';
import {IProduct, IProductFilterQuery, IRequestExtended, IReview, IUser} from '../../models';
import {ProductType} from '../../database';
import {csvParserHelper, ProductQueryBuilder} from '../../helpers';
import {customErrors, ErrorHandler} from '../../errors';
import {logService, productService} from '../../services';
// import * as findUp from 'find-up';

export class ProductController {
  /***********************************CRUD products***********************************/
  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allProducts = await productService.getProducts();
      console.log('************************************************allProducts*********************');
      console.log(allProducts.length);
      res.json(allProducts);
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

      const filterQuery = ProductQueryBuilder(req.query as Partial<IProductFilterQuery>);

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

  getProduct = async (req: Request, res: Response, next: NextFunction) => {
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

  createProduct = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const {_id} = req.user as IUser;
      const newProduct = await productService.createProduct({...req.body, userID: _id});

      await logService.createLog({event: ActionEnum.USER_CREATE_PRODUCT, userId: _id, data: newProduct._id});

      res.json(newProduct);
    } catch (e) {
      next(e);
    }
  }

  createProductFromCSV = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const csvFilePath = 'public/product/csv/Products.csv';
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

  updateProduct = async (req: IRequestExtended, res: Response, next: NextFunction) => {
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

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deletedProduct = await productService.deleteProduct(+req.params.productID);

      res.json(deletedProduct);
    } catch (e) {
      next(e);
    }
  }

  /***********************************PHOTOS products***********************************/
  addProductSinglePhoto = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productService.updateProduct(+req.params.productID, req.body);

      res.json(product);
    } catch (e) {
      next(e);
    }
  }

  addProductMultiPhoto = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const photos = req.files as Express.Multer.File[];

      for (const photo of photos) {
        await productService.addProductPhotos(photo.originalname, req.product?._id);
      }

      res.json({message: 'YES!!!'});
    } catch (e) {
      next(e);
    }
  }

  getProductPhoto = (req: IRequestExtended, res: Response, next: NextFunction) => {
    const {title} = req.product as ProductType;
    const filePath = `public/product/${title}/${req.params.photoTitle}`;

    // const isFile = await findUp(filePath);
    // console.log(isFile);
    // if (isFile) {
    //   if (!customConfirm('This file already exists. Do you want to replace it?')) {
    //     return;
    //   }
    // }
    //
    const typeFile = path.extname(filePath).slice(1);
    const loadingFile = fs.createReadStream(filePath);
    loadingFile.on('open', () => {
      res.setHeader('Content-Type', `image/${typeFile}`);
      loadingFile.pipe(res);
    });
    // await res.json('done');

  }

  deletePhotoProduct = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const product = req.product as IProduct;
      const photoTitle = req.params.photoTitle;

      const deletedPhoto = await productService.removePhotoOfProduct(product._id as Partial<IProduct>, photoTitle);
      await fs.unlink(`public/product/${product.title}/${photoTitle}`);
      res.json(`photo ${deletedPhoto?.title} is removed`);
    } catch (e) {
      next(e);
    }
  }

  /***********************************REVIEWS products***********************************/
  addProductReview = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const update = {...req.body, userID: req.user?._id, createdAt: Date.now()} as IReview;

      const updatedProduct = await productService.updateProductByReview(req.product?._id as string, update);

      res.json(updatedProduct);
    } catch (e) {
      next(e);
    }

  }

  deleteComment = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const product = req.product as IProduct;
      const commentID = req.params.commentID;

      const updatedProduct = await productService.removeCommentExt(product.id, commentID);

      res.json(updatedProduct);
    } catch (e) {
      next(e);
    }
  }

  getProductReviews = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const reviews = await productService.getReviewsByProductID(+req.params.productID);
      res.json(reviews[0].reviews?.sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }));
    } catch (e) {
      next(e);
    }
  }

  deleteUserComments = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const {_id} = req.user as IUser;
      const products = await productService.removeAllUserComments(_id);
      res.json(products);
    } catch (e) {
      next(e);
    }
  }

}

export const productController = new ProductController();
