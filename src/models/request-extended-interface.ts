import {Request} from 'express';

import {ICart} from './cart';
import {ICategory, ISubCategory, ISubSubCategory} from './category';
import {IOrder} from './order';
import {IProduct} from './product';
import {IUser} from './user';

export interface IRequestExtended extends Request {
  category?: ICategory;
  subcategory?: ISubCategory;
  subsubcategory?: ISubSubCategory;
  user?: IUser;
  product?: IProduct;
  cart?: ICart;
  order?: IOrder;
}
