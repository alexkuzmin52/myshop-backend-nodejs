export interface IProductFilterQuery {
  category?: string,
  priceGte?: number,
  priceLte?: number,
  newFlag?: boolean,
  title?: string,
  brand?: string,
  countryOfManufacture?: string
}
