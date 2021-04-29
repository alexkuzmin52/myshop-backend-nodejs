import {ISubCategory} from './subcategory-interface';

export interface ICategory {
  _id: string,
  id: number;
  parentID: number;
  title: string;
  overview_url: string;
  logo: string;
  subCategories: [ISubCategory]
}

