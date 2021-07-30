export const customErrors = {
  BAD_REQUEST_CREATE_CATEGORY: {
    message: 'Category already exists',
    code: 4001
  },
  BAD_REQUEST_CREATE_SUB_CATEGORY: {
    message: ' Sab Category already exists',
    code: 4002
  },
  BAD_REQUEST_CREATE_SUB_SUB_CATEGORY: {
    message: 'Sab Sab Category already exists',
    code: 4003
  },
  BAD_REQUEST_CREATE_USER_EMAIL: {
    message: 'User with this email already exists',
    code: 4004
  },
  BAD_REQUEST_CONFIRM_USER_TOKEN: {
    message: 'Confirm token missing',
    code: 4005
  },
  BAD_REQUEST_FORGOT_USER_TOKEN: {
    message: 'Forgot token missing',
    code: 4006
  },
  BAD_REQUEST_NO_TOKEN: {
    message: 'Token is not present',
    code: 4007
  },
  BAD_REQUEST_USER_ACTIVATED: {
    message: 'User is already activated',
    code: 4008
  },
  BAD_REQUEST_NOT_TITLE_CATEGORY: {
    message: 'Category name missing',
    code: 4009
  },
  BAD_REQUEST_NOT_TITLE_CATEGORY_OR_TITLE_SUB_CATEGORY: {
    message: 'Category name or Sub Category name missing',
    code: 4010
  },
  FORBIDDEN_USER_NOT_CONFIRMED: {
    message: 'User is not confirmed',
    code: 4031
  },
  UNAUTHORIZED_BAD_TOKEN: {
    message: 'Something wrong with token'
  },
  NOT_FOUND: {
    message: 'Record not found'

  },
  WRONG_ACTION_TYPE: {
    message: 'wrong Action Type',
    code: 5001
  },
  BAD_REQUEST_PRODUCT_TITLE: {
    message: 'Product with this title already exists',
    code: 4011
  },
  BAD_REQUEST_GET_PRODUCT: {
    message: 'Product not found',
    code: 4012
  },
  BAD_REQUEST_PRODUCT_UPDATE_NOT_FOUND: {
    message: 'Updated product not found',
    code: 4013
  },
  BAD_REQUEST_CATEGORY_UPDATE_NOT_FOUND: {
    message: 'Updated category not found'
  },
  BAD_REQUEST_ADD_PRODUCT_TO_CART_NOT_FOUND: {
    message: 'Product not found'
  },
  BAD_REQUEST_PRODUCT_TO_CART_ALREADY_EXIST: {
    message: 'Product in cart already exist'
  },

  BAD_REQUEST_ADD_PRODUCT_TO_CART_LACK_OF_STOCK: {
    message: 'Lack of product in stock'
  },
  BAD_REQUEST_DELETE_PRODUCT_IN_CART_NOT_FOUND_USER_CART: {
    message: 'User cart not found'
  },
  BAD_REQUEST_UPDATE_PRODUCT_IN_CART_NOT_FOUND_USER_CART: {
    message: 'User cart not found'
  },
  BAD_REQUEST_UPDATE_PRODUCT_IN_CART_NOT_FOUND_PRODUCT_FROM_DB: {
    message: 'Product not found',
    code: 4014
  },
  BAD_REQUEST_CONFIRM_ORDER_NOT_FOUND: {
    message: 'Order not found',
    code: 4015
  },
  BAD_REQUEST_USER_CART_NOT_F0UND: {
    message: 'User cart not found',
    code: 4016
  },
  BAD_REQUEST_USER_CART_IS_EMPTY: {
    message: 'User cart is empty',
    code: 4017
  },

  BAD_REQUEST_REGISTER_ORDER_LACK_OF_PRODUCTS: {
    message: 'Lack of products in stock',
    code: 4018
  },
  BAD_REQUEST_SUB_CATEGORY_TO_CATEGORY_ALREADY_ADDED: {
    message: 'Subcategory has already been added to the category',
    code: 4019
  },

  BAD_REQUEST_SUB_SUB_CATEGORY_TO_SUB_CATEGORY_ALREADY_ADDED: {
    message: 'SubSubcategory has already been added to the category',
    code: 4020
  },
  BAD_REQUEST_CATEGORY_NOT_EMPTY: {
    message: 'Category contains subcategories',
    code: 4021
  },
  BAD_REQUEST_SUB_CATEGORY_NOT_EMPTY: {
    message: 'SubCategory contains subSubcategories',
    code: 4022
  }

};
