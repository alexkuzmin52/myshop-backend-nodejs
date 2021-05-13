import {NextFunction, Request, Response} from 'express';
import * as csv from 'csvtojson';

import {categoryService, logService} from '../../services';
import {ICategory, IRequestExtended, ISubCategory, ISubSubCategory} from '../../models';
import {CategoryType, SubCategoryType, SubSubCategoryType} from '../../database';
import * as path from 'path';
import * as fs from 'fs';
import {ActionEnum, ResponseStatusCodeEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';
import {csvParserHelper} from '../../helpers/csv-parser-helper';

class CategoryController {
// ****************************************************** create ************************************************
  createCategory = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const newCategory = await categoryService.createCategory(req.body as Partial<ICategory>);
      const resCategory = await categoryService.getResCategory(newCategory.id);
      await logService.createLog({
        event: ActionEnum.CATEGORY_CREATE,
        userId: req.user?._id, data:
          {id: newCategory._id, title: newCategory.title}
      });
      res.json(resCategory);
    } catch (e) {
      next(e);
    }
  }

  createSubCategory = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const newSubCategory = await categoryService.createSubCategory(req.body);
      const resSubCategory = await categoryService.getResSubCategory(newSubCategory.id);
      await logService.createLog({
        event: ActionEnum.SUB_CATEGORY_CREATE,
        userId: req.user?._id,
        data: {id: newSubCategory._id, title: newSubCategory.title}
      });

      res.json(resSubCategory);
    } catch (e) {
      next(e);
    }
  }
  createSubSubCategory = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const newSubSubCategory = await categoryService.createSubSubCategory(req.body);
      const resSubSubCategory = await categoryService.getResSubSubCategory(newSubSubCategory.id);
      await logService.createLog({
        event: ActionEnum.SUB_SUB_CATEGORY_CREATE,
        userId: req.user?._id,
        data: {id: newSubSubCategory._id, title: newSubSubCategory.title}
      });
      res.json(resSubSubCategory);
    } catch (e) {
      next(e);
    }
  }

  // ****************************************************** add ************************************************
  addSubCategory = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const {idCat} = req.body;
      console.log(idCat);
      const sub = req.subcategory as SubCategoryType;
      sub.parentID = idCat;
      await sub.save();
      const updatedCategory = await categoryService.addSubCategoryToCategory(idCat, sub);

      await logService.createLog({event: ActionEnum.ADD_SUB_CATEGORY, userId: req.user?._id, data: sub.id});
      res.json(updatedCategory);

    } catch (e) {
      return next(e);
    }
  }

  addSubSubCategory = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const subsub = req.subsubcategory as SubSubCategoryType;
      subsub.parentID = req.body.idSubCat;
      await subsub.save();

      const updatedSubCategory = await categoryService.addSubSubCategoryToSubCategory(req.body.idSubCat, subsub);

      if (updatedSubCategory) {
        const category = await categoryService.getCategoryByID(updatedSubCategory.parentID);
        if (category) {
          const updatedCategory = await categoryService.updateCategoryBySubCategory(category, updatedSubCategory);

          await logService.createLog({event: ActionEnum.ADD_SUB_SUB_CATEGORY, userId: req.user?._id, data: subsub.id});
          res.json(updatedCategory);
        }
      }
      res.json(updatedSubCategory);
      // else {res.json({error: 'Unknown error'});}

    } catch (e) {
      return next(e);
    }
  }

  testCreateSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newSubCategory = await categoryService.createSubCategory(req.body as Partial<ISubCategory>);
      res.json(newSubCategory);

    } catch (e) {
      next(e);
    }
  }

  testCreateSubSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newSubSubCategory = await categoryService.createSubSubCategory(req.body as Partial<ISubSubCategory>);
      res.json(newSubSubCategory);

    } catch (e) {
      next(e);
    }
  }

  // ****************************************************** read ************************************************
  //get all Categories
  GetAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await categoryService.getCategories();
      res.json(categories);

    } catch (e) {
      next(e);
    }
  }

  GetAllSubCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subcategories = await categoryService.getSubCategories();
      res.json(subcategories);

    } catch (e) {
      next(e);
    }
  }

  //get all Sub Sub Categories
  GetAllSubSubCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subsubcategories = await categoryService.getSubSubCategories();
      res.json(subsubcategories);

    } catch (e) {
      next(e);
    }
  }

  //get Category by its title
  GetCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await categoryService.getCategoryByParams({id: +req.params.cat_id});
      if (!category) {
        return next(new ErrorHandler(ResponseStatusCodeEnum.NOT_FOUND,
          customErrors.NOT_FOUND.message));
      }
      res.json(category);
    } catch (e) {
      next(e);
    }
  }

  //get SubCategory by its title
  GetSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subcategory = await categoryService.getSubCategoryByParams({id: +req.params.cat_id});
      res.json(subcategory);
    } catch (e) {
      next(e);
    }
  }

  //get SubSubCategory by its title
  async GetSubSubCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const subsubcategory = await categoryService.getSubSubCategoryByParams({id: +req.params.cat_id});
      res.json(subsubcategory);
    } catch (e) {
      next(e);
    }
  }

  // ****************************************************** delete ************************************************
  // delete Category===============================================================================================
  DeleteCategory = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const category = req.body as ICategory;
      const deletedCategory = await categoryService.removeCategory({id: category.id});
      res.json(deletedCategory);
    } catch (e) {
      next(e);
    }
  }

  // delete Sub Category ==========================================================================================
  deleteSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subcategory = req.body as ISubCategory;

      const deletedSubCategory = await categoryService.removeSubCategory({id: subcategory.id});
      res.json(deletedSubCategory);
    } catch (e) {
      next(e);
    }
  }

  deleteSubSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subsubcategory = req.body as ISubSubCategory;

      const deletedSubSubCategory = await categoryService.removeSubSubCategory({id: subsubcategory.id});
      res.json(deletedSubSubCategory);

    } catch (e) {
      next(e);
    }
  }

  // ****************************************************** update ************************************************

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedCategory = await categoryService.updateCategory(+req.params.cat_id as Partial<ICategory>, req.body);
      res.json(updatedCategory);
    } catch (e) {
      next(e);
    }
  }

  async updateSubCategory(req: IRequestExtended, res: Response, next: NextFunction) {
    try {

      const sub_id = +req.params.cat_id as Partial<ISubCategory>;
      const sub = req.body;
      const updatedSubCategory = await categoryService.updateSubCategory(sub_id, sub);
      const cat = await categoryService.getCategory(updatedSubCategory?.parentID as Partial<ICategory>);
      const updatedCategory = await categoryService.updateCategoryBySubCategory(cat as CategoryType, updatedSubCategory as ISubCategory);

      await logService.createLog({event: ActionEnum.ADD_SUB_SUB_CATEGORY, userId: req.user?._id, data: sub_id});

      res.json(updatedCategory);

    } catch (e) {
      next(e);
    }
  }

  async updateSubSubCategory(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const sub_sub_id = +req.params.cat_id as Partial<ISubSubCategory>;
      const subsub = req.body;

      const updatedSubSubCategory = await categoryService.updateSubSubCategory(sub_sub_id, subsub);
      const sub = await categoryService.getSubCategory(updatedSubSubCategory?.parentID as Partial<ISubSubCategory>);
      const updatedSubCategory = await categoryService.updateSubCategoryBySubSubCategory(sub as SubCategoryType,
        updatedSubSubCategory as SubSubCategoryType);
      const cat = await categoryService.getCategory(updatedSubCategory?.parentID as Partial<ICategory>);
      const updatedCategory = await categoryService.updateCategoryBySubCategory(cat as CategoryType,
        updatedSubCategory as ISubCategory);
      await logService.createLog({event: ActionEnum.ADD_SUB_CATEGORY, userId: req.user?._id, data: sub_sub_id});
      res.json(updatedCategory);

    } catch (e) {
      next(e);
    }
  }

  // async addCategoryLogo(req: Request, res: Response, next: NextFunction) {
  //   const categoryID = req.body as Partial<ICategory>;
  //   const cat = await categoryService.addCategoryLogo(categoryID);
  // }
  async getLogo(req: Request, res: Response, next: NextFunction) {
    // const mime = {
    //   'html': 'text/html',
    //   'txt': 'text/plain',
    //   'css': 'text/css',
    //   'gif': 'image/gif',
    //   'jpg': 'image/jpeg',
    //   'png': 'image/png',
    //   'svg': 'image/svg+xml',
    //   'js': 'application/javascript'
    // };

    const pathFile = path.resolve(process.cwd(), 'public/category/');
    // console.log((global as any).appRoot);

    console.log(pathFile);
    // console.log(req);
    console.log(req.params);
    // await res.end();

    const category = await categoryService.getCategory(req.params.cat_id as Partial<ICategory>);
    console.log(category?.logo);
    const loadingFilePath = pathFile + `/${category?.logo}`;
    console.log(loadingFilePath);

    const typeFile = path.extname(loadingFilePath).slice(1);
    console.log('typeFile');
    console.log(typeFile);

    const loadingFile = fs.createReadStream(loadingFilePath);
    loadingFile.on('open', () => {
      res.setHeader('Content-Type', `image/${typeFile}`);
      loadingFile.pipe(res);
    });
    // res.sendFile(loadingFile);
    // await res.json({message: 'logo'});
  }

  async getSubLogo(req: Request, res: Response, next: NextFunction) {
    // const mime = {
    //   'html': 'text/html',
    //   'txt': 'text/plain',
    //   'css': 'text/css',
    //   'gif': 'image/gif',
    //   'jpg': 'image/jpeg',
    //   'png': 'image/png',
    //   'svg': 'image/svg+xml',
    //   'js': 'application/javascript'
    // };

    const pathFile = path.resolve(process.cwd(), 'public/subcategory/');
    // console.log((global as any).appRoot);

    console.log(pathFile);
    // console.log(req);
    console.log(req.params);
    // await res.end();

    const category = await categoryService.getSubCategory(req.params.cat_id as Partial<ICategory>);
    console.log(category?.logo);
    const loadingFilePath = pathFile + `/${category?.logo}`;
    console.log(loadingFilePath);

    const typeFile = path.extname(loadingFilePath).slice(1);
    console.log('typeFile');
    console.log(typeFile);

    const loadingFile = fs.createReadStream(loadingFilePath);
    loadingFile.on('open', () => {
      res.setHeader('Content-Type', `image/${typeFile}`);
      loadingFile.pipe(res);
    });
    // res.sendFile(loadingFile);
    // await res.json({message: 'logo'});
  }

  async getSubSubLogo(req: Request, res: Response, next: NextFunction) {
    // const mime = {
    //   'html': 'text/html',
    //   'txt': 'text/plain',
    //   'css': 'text/css',
    //   'gif': 'image/gif',
    //   'jpg': 'image/jpeg',
    //   'png': 'image/png',
    //   'svg': 'image/svg+xml',
    //   'js': 'application/javascript'
    // };

    const pathFile = path.resolve(process.cwd(), 'public/subsubcategory/');
    // console.log((global as any).appRoot);

    console.log(pathFile);
    // console.log(req);
    console.log(req.params);
    // await res.end();

    const category = await categoryService.getSubSubCategory(req.params.cat_id as Partial<ICategory>);
    console.log(category?.logo);
    const loadingFilePath = pathFile + `/${category?.logo}`;
    console.log(loadingFilePath);

    const typeFile = path.extname(loadingFilePath).slice(1);
    console.log('typeFile');
    console.log(typeFile);

    const loadingFile = fs.createReadStream(loadingFilePath);
    loadingFile.on('open', () => {
      res.setHeader('Content-Type', `image/${typeFile}`);
      loadingFile.pipe(res);
    });
    // res.sendFile(loadingFile);
    // await res.json({message: 'logo'});
  }

  // addSubToCat = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     // const {subTitle, catTitle} = req.body;
  //     console.log(req.body);
  //     const cat = await categoryService.getCategoryByTitle(req.body.catTitle);
  //     const sub = await categoryService.getSubCategoryByTitle(req.body.subTitle);
  //
  //     console.log(cat);
  //     console.log(sub);
  //     if (cat && sub) {
  //       sub.parentID = cat.id;
  //       cat.subCategories.push(sub);
  //       await sub.save();
  //       await cat.save();
  //     }
  //     res.json(cat);
  //   } catch (e) {
  //     return next(e);
  //   }
  // }

  // addSubSubToSub = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const subSub = await categoryService.getSubSubCategoryByTitle(req.body.subSubTitle);
  //     const sub = await categoryService.getSubCategoryByTitle(req.body.subTitle);
  //     // const cut = await categoryService.getCategory(sub?.parentID)
  //     if (subSub && sub) {
  //
  //       subSub.parentID = sub.id;
  //       sub.subsubCategories.push(subSub);
  //       await subSub.save();
  //       await sub.save();
  //       console.log('sub.parentID');
  //       console.log(sub.parentID);
  //       const cat = await categoryService.getCategory(sub.parentID as Partial<ICategory>);
  //       const updatedCategory = await categoryService.updateCategoryBySubCategory(cat as CategoryType, sub as ISubCategory);
  //
  //       res.json(updatedCategory);
  //     }
  //
  //   } catch (e) {
  //     return next(e);
  //   }
  // }
  createCategoriesFromCSV = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    console.log(req.body);
    const csvFilePath = 'public/category/csv/Categories.csv';

    const jsonArray = await csv().fromFile(csvFilePath);
    console.log(jsonArray);
    for (const jsonArrayElement of jsonArray) {
      await categoryService.createCategory(jsonArrayElement);
    }
    res.json(jsonArray);
  }

  createCategoriesFromCSVExt = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    const categoryArray = await csvParserHelper('public/category/csv/Categories.csv');
    for (const category of categoryArray) {
      await categoryService.createCategory(category as Partial<ICategory>);
    }
    const allCategories = await categoryService.getCategories();
    res.json(allCategories);
  }

  createSubCategoriesFromCSV = async (req: IRequestExtended, res: Response, next: NextFunction)=> {
    const subCategoryArray = await csvParserHelper('public/category/csv/SubCategories.csv');
    for (const category of subCategoryArray) {
      await categoryService.createSubCategory(category as Partial<ISubCategory>);
    }
    const allSubCategories = await categoryService.getSubCategories();
    res.json(allSubCategories);
  }

  createSubSubCategoriesFromCSV = async (req: IRequestExtended, res: Response, next: NextFunction)=> {
    const subSubCategoryArray = await csvParserHelper('public/category/csv/SubSubCategories.csv');
    for (const category of subSubCategoryArray) {
      await categoryService.createSubSubCategory(category as Partial<ISubSubCategory>);
    }
    const allSubSubCategories = await categoryService.getSubSubCategories();
    res.json(allSubSubCategories);
  }
}

export const categoryController = new CategoryController();
