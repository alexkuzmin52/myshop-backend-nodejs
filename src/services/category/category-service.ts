import {
  CategoryModel,
  CategoryType,
  SubCategoryModel,
  SubCategoryType,
  SubSubCategoryModel,
  SubSubCategoryType
} from '../../database';
import {ICategory, ISubCategory, ISubSubCategory} from '../../models';

export class CategoryService {
//************************************** create *****************************************************
  createCategory(category: Partial<ICategory>): Promise<CategoryType> {
    return new CategoryModel(category).save();
  }

  getResCategory(catID: number): Promise<CategoryType | null> {
    return CategoryModel.findOne({id: catID})
      .select('id title parentID overview_url -_id')
      .exec();
  }

  createSubCategory(subcategory: Partial<ISubCategory>): Promise<SubCategoryType> {
    return new SubCategoryModel(subcategory).save();
  }

  getResSubCategory(subCatID: number): Promise<SubCategoryType | null> {
    return SubCategoryModel.findOne({id: subCatID})
      .select('id title parentID overview_url -_id')
      .exec();
  }

  createSubSubCategory(subsubcategory: Partial<ISubSubCategory>): Promise<SubSubCategoryType> {
    console.log('subsubcategory');

    return new SubSubCategoryModel(subsubcategory).save();
  }

  getResSubSubCategory(subSubCatID: number): Promise<SubSubCategoryType | null> {
    return SubSubCategoryModel.findOne({id: subSubCatID})
      .select('id title parentID overview_url -_id')
      .exec();
  }

  //************************************** add subcategories *****************************************************
  addSubCategoryToCategory(idCat: Partial<ICategory>, sub: SubCategoryType): Promise<CategoryType | null> {
    return CategoryModel.findOneAndUpdate(
      {id: idCat},
      {$push: {subCategories: sub}},
      {new: true}).exec();
  }

  addSubSubCategoryToSubCategory(
    idSubCat: Partial<ISubCategory>, subsub: SubSubCategoryType): Promise<SubCategoryType | null> {
    return SubCategoryModel.findOneAndUpdate(
      {id: idSubCat},
      {$push: {subSubCategories: subsub}},
      {new: true}).exec();
  }

  getCategoryByParams(param: Partial<ICategory>): Promise<CategoryType | null> {
    return CategoryModel.findOne(param).exec();
  }

  getSubCategoryByParams(param: Partial<ISubCategory>): Promise<SubCategoryType | null> {
    return SubCategoryModel.findOne(param).exec();
  }

  getSubSubCategoryByParams(subsub: Partial<ISubSubCategory>): Promise<SubSubCategoryType | null> {
    return SubSubCategoryModel.findOne(subsub).exec();
  }

  //************************************** find By Title *********************************************

  findCategoryByTitle(titleCategory: string): Promise<CategoryType | null> {
    return CategoryModel.findOne({title: titleCategory}).exec();
  }

  findSubCategoryByTitle(titleSubCategory: string): Promise<SubCategoryType | null> {
    return SubCategoryModel.findOne({title: titleSubCategory}).exec();
  }

  findSubSubCategoryByTitle(titleSubSubCategory: string): Promise<SubSubCategoryType | null> {
    return SubSubCategoryModel.findOne({title: titleSubSubCategory}).exec();
  }

  //************************************** find By Params *********************************************

  findCategoryByProperty(titleCategory: Partial<ICategory>): Promise<CategoryType | null> {
    return CategoryModel.findOne(titleCategory).exec();
  }

  findSubCategoryByProperty(titleSubCategory: Partial<ISubCategory>): Promise<SubCategoryType | null> {
    return SubCategoryModel.findOne(titleSubCategory).exec();
  }

  findSubSubCategoryByProperty(titleSubSubCategory: Partial<ISubSubCategory>): Promise<SubSubCategoryType | null> {
    return SubSubCategoryModel.findOne(titleSubSubCategory).exec();
  }

  //*************************************** Get *******************************************************
  getCategories(): Promise<ICategory[]> {
    return CategoryModel.find().exec();
  }

  getSubCategories(): Promise<ISubCategory[]> {
    return SubCategoryModel.find().exec();
  }

  getSubSubCategories(): Promise<ISubSubCategory[]> {
    return SubSubCategoryModel.find().exec();
  }

  getCategoryByTitle(titleCat: string): Promise<CategoryType | null> {
    return CategoryModel.findOne({title: titleCat}).exec();
  }

  getSubCategoryByTitle(titleSub: string): Promise<SubCategoryType | null> {
    return SubCategoryModel.findOne({title: titleSub}).exec();
  }

  getSubSubCategoryByTitle(titleSubSub: string): Promise<SubSubCategoryType | null> {

    return SubSubCategoryModel.findOne({title: titleSubSub}).exec();
  }

  removeCategory(idCategory: Partial<ICategory>): Promise<{ deletedCount?: number }> {
    return CategoryModel.deleteOne(idCategory).exec();
  }

  removeSubCategory(idSubCategory: Partial<ISubCategory>): Promise<{ deletedCount?: number }> {
    return SubCategoryModel.deleteOne(idSubCategory).exec();
  }

  removeSubSubCategory(idSubSubCategory: Partial<ISubSubCategory>): Promise<{ deletedCount?: number }> {
    return SubSubCategoryModel.deleteOne(idSubSubCategory).exec();
  }

  //TODO
  //  Sub Category========================================================================
  removeOneSubCategory(idSubCategory: Partial<ISubCategory>): Promise<{ deletedCount?: number }> {
    return SubCategoryModel.deleteOne(idSubCategory).exec();
  }

  removeSubSubCategoryFromOneSubCategory(parentID: Partial<ISubCategory>): Promise<{ deletedCount?: number }> {
    return SubSubCategoryModel.deleteMany(parentID).exec();
  }

  removeOneSubCategoryFromCategory(subcategory: ISubCategory) {
    return CategoryModel.findOneAndUpdate({id: subcategory.parentID},
      {
        $pull: {
          subCategories: {id:subcategory.id}
        }
      },
      {new: true});
  }

  //  Sub Sub Category====================================================================
  removeOneSubSubCategory(idSubSubCategory: number): Promise<SubSubCategoryType | null> {
    return SubSubCategoryModel.findOneAndDelete({id: idSubSubCategory}).exec();
  }

  removeOneSubSubCategoryFromSubCategory(subsubcategory: Partial<ISubSubCategory>): Promise<SubCategoryType | null> {
    return SubCategoryModel.findOneAndUpdate({id: subsubcategory.parentID},
      {
        $pull: {
          subsubCategories: {id: subsubcategory.id}
        }
      },
      {new: true}).exec();
  }

  // findUpdatedCategory(param: { _id: number | undefined }): Promise<CategoryType | null> {
  //
  //   return CategoryModel.findById(param).exec();
  // }

  //******************************** Update *********************************************
  // Category============================================================================
  updateCategory(idCategory: Partial<ICategory>, params: Partial<ICategory>): Promise<CategoryType | null> {
    return CategoryModel.findOneAndUpdate({id: idCategory}, params, {new: true}).exec();

  }

  updateSubCategory(idSubCategory: Partial<ISubCategory>, body: Partial<ISubCategory>): Promise<SubCategoryType | null> {
    return SubCategoryModel.findOneAndUpdate({id: idSubCategory}, body, {new: true}).exec();
  }

  updateSubSubCategory(idSubSubCategory: Partial<ISubCategory>, body: any): Promise<SubSubCategoryType | null> {
    return SubSubCategoryModel.findOneAndUpdate({id: idSubSubCategory}, body, {new: true}).exec();
  }

  getSubCategory(number: Partial<ISubSubCategory>): Promise<SubCategoryType | null> {
    return SubCategoryModel.findOne({id: number}).exec();
  }

  getSubSubCategory(number: Partial<ISubSubCategory>): Promise<SubSubCategoryType | null> {
    return SubSubCategoryModel.findOne({id: number}).exec();
  }

  getCategory(categoryID: Partial<ICategory>): Promise<CategoryType | null> {
    return CategoryModel.findOne({id: categoryID}).exec();
  }

  getCategoryByID(parentID: number): Promise<CategoryType | null> {
    return CategoryModel.findOne({id: parentID}).exec();
  }

  updateCategoryBySubCategory(category: CategoryType, subcategory: ISubCategory): Promise<CategoryType | null> {
    const index = category.subCategories.findIndex(value => value.id === subcategory.id);

    if (index !== -1) {
      category.subCategories[index] = subcategory;
    }

    return category.save();
  }

  updateSubCategoryBySubSubCategory(subcategory: SubCategoryType,
    subsubcategory: SubSubCategoryType): Promise<SubCategoryType | null> {
    const index = subcategory?.subSubCategories.findIndex((value => value.id === subsubcategory?.id));

    if (index !== -1) {
      subcategory.subSubCategories[index] = subsubcategory;
    }

    return subcategory.save();
  }

  getSubCategoriesByParams(param: { parentID: number }): Promise<SubCategoryType[] | null> {
    return SubCategoryModel.find(param).exec();
  }

  getSubSubCategoriesByParams(param: { parentID: number }): Promise<SubSubCategoryType[] | null> {
    return SubSubCategoryModel.find(param).exec();

  }

  changeSubCategoryParentID(id: number | undefined): Promise<{ nModified: number }> {
    return SubCategoryModel.updateOne({parentID: id}, {parentID: -1}).exec();
  }

  changeSubSubCategoryParentID(id: number | undefined): Promise<{ nModified: number }> {
    return SubSubCategoryModel.updateMany({parentID: id}, {parentID: -1}).exec();
  }

  updateSubCategoryByParams(subsubcategory: ISubSubCategory): Promise<SubCategoryType | null> {
    return SubCategoryModel.findOneAndUpdate({id: subsubcategory.parentID},
      {
        $pull: {
          subSubCategories: {id: subsubcategory.id}
        }
      },
      {new: true}
    ).exec();
  }
}

export const categoryService = new CategoryService();
