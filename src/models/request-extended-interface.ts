import {Request} from 'express';

import {ICategory, ISubCategory, ISubSubCategory} from './category';
import {IUser} from './user';
import {IProduct} from './product';
import {ICart} from './cart';
import {IOrder} from './order';
// import {IProduct} from './product';

export interface IRequestExtended extends Request {
  category?: ICategory;
  subcategory?: ISubCategory;
  subsubcategory?: ISubSubCategory;
  user?: IUser;
  product?: IProduct;
  cart?: ICart;
  order?: IOrder;
}
