import {IProductFilter, IProductFilterQuery} from '../../../models';

export const ProductQueryBuilder = (query: Partial<IProductFilterQuery>): Partial<IProductFilter> => {
  const productFilter: Partial<IProductFilter> = {};
  const keys = Object.keys(query) as Array<keyof IProductFilterQuery>;
  console.log('console.log(keys);');
  console.log(keys);
  keys.forEach((key) => {
    switch (key) {
      case 'category':
        productFilter.category = query.category;
        break;
      case 'priceGte':
        productFilter.price =Object.assign({}, productFilter.price, {$gte: Number(query.priceGte)});
        break;
      case 'priceLte':
        productFilter.price =Object.assign({}, productFilter.price, {$lte: Number(query.priceLte)});
        break;
      case 'newFlag':
        productFilter.newFlag = Boolean(query.newFlag);
        break;
      case 'promoFlag':
        productFilter.promoFlag = Boolean(query.promoFlag);
        break;
      case 'brand':
        productFilter.brand = query.brand;
        break;
      case 'title':
        productFilter.title = query.title;
        console.log('productFilter');
        console.log(productFilter);
        break;
      case 'countryOfManufacture':
        productFilter.countryOfManufacture = query.countryOfManufacture;
        break;

      default:
        // productFilter = Object.assign({}, query);
        // productFilter = {...query}
        break;
        // productFilter[key] = query[key];

    }
  });

  return productFilter;
};
