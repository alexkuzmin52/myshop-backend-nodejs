// import {ICart, IProduct, IProductInCart} from '../models';

// export const recalculationCart = (userCart: ICart, product: IProduct, count: number): { userCart: ICart, product: IProduct } => {
//   const index = userCart.products.findIndex((value: IProductInCart) => value.productID.toString() === product._id.toString());
//   if (index !== -1 && userCart.products[index].count !== count) {
//     userCart.products[index].count += count - userCart.products[index].count;
//     product.stockCount -= count - userCart.products[index].count;
//   } else {
//     userCart.products.push({
//       productID: product._id,
//       count,
//       price: product.price,
//
//     });
//     product.stockCount = count - userCart.products[index].count;
//
//   }
//   let sum = 0;
//   for (const product of userCart.products) {
//     sum = sum + product.price * product.count;
//   }
//   userCart.amount = userCart.products.length;
//   userCart.sum = sum;
//
//   return {userCart, product};
// };
