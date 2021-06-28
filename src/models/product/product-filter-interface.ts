export interface IProductFilter {
  category?: string;
  price?: { $gte: number, $lte: number};
  newFlag?: boolean;
  title?: string;
  brand?: string;
  countryOfManufacture?: string;
}
