// import {CartModel} from '../database';
// import {CartStatusEnum, TimeoutEnum} from '../constants';
//
// export const removeItemFromCart = (cartID: string, productID: string) => {
//   // const timeOut = 60000;
//   setTimeout(async () => {
//     const userCart = await CartModel.findById(cartID);
//
//     if (!userCart || userCart.status !== CartStatusEnum.IN_PROGRESS) {
//       return;
//     }
//     // if (userCart.status === CartStatusEnum.IN_PROGRESS) {
//     const index = await userCart.products.findIndex(value => {
//       return value.productID.toString() === productID.toString();
//     });
//     if (index !== -1) {
//       userCart.products.splice(index, 1);
//       await userCart.save();
//     }
//     // }
//
//   }, TimeoutEnum.LIFETIME_PRODUCT_IN_CART);
// };
//TODO
