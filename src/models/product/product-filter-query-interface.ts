export interface IProductFilterQuery {
  category?: string;
  priceGte?: number;
  priceLte?: number;
  newFlag?: boolean;
  promoFlag?: boolean,
  title?: string;
  brand?: string;
  countryOfManufacture?: string;
}
