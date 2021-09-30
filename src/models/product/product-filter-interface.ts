export interface IProductFilter {
  category?: string;
  price?: { $gte: number, $lte: number};
  newFlag?: boolean;
  promoFlag?: boolean,
  title?: string;
  brand?: string;
  countryOfManufacture?: string;
}
