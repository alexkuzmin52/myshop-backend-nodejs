import {CartModel, CartType} from '../../database';
import {ICart} from '../../models';

export class CartService {
  getPopulatedUserCart = (userID: string): Promise<CartType | null> => {
    return CartModel
      .findOne({userID})
      .select('-userID -products._id')
      .populate({
        path: 'products',
        select: ('-_id'),
        populate: {
          path: 'productID',
          model: 'products',
          select: 'price title sumProduct stockCount photo'
        }
      })
      .exec();
  }

  createUserCart(userId: string): Promise<CartType> {
    return new CartModel({userID: userId}).save();
  }

  updateCart(cartID: string, updatingCart: ICart): Promise<ICart | null> {
    return CartModel.findOneAndUpdate({_id: cartID}, updatingCart, {new: true}).exec();
  }
  //TODO
  getUserCart(userID: string): Promise<CartType | null> {
    return CartModel.findOne({userID}).exec();
  }

  deleteUserCart(cartID: string): Promise<ICart | null> {
    return CartModel.findByIdAndDelete(cartID).lean().exec();
  }
}
export const cartService = new CartService();
