import {NextFunction, Request, Response} from 'express';

import {categoryService, logService} from '../../services';
import {ICategory, IRequestExtended, ISubCategory, ISubSubCategory} from '../../models';
import {CategoryType, SubCategoryType, SubSubCategoryType} from '../../database';
import * as path from 'path';
import * as fs from 'fs';
import {ActionEnum} from '../../constants';

// import {CategoryModel} from '../../database/models/category';

class CategoryController {
// ****************************************************** create ************************************************
  createCategory = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const newCategory = await categoryService.createCategory(req.body as Partial<ICategory>);
      const resCategory = await categoryService.getResCategory(newCategory.id);
      await logService.createLog({event: ActionEnum.CATEGORY_CREATE,userId:req.user?._id, data: newCategory._id});
      res.json(resCategory);
    } catch (e) {
      next(e);
    }
  }

  createSubCategory = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const newSubCategory = await categoryService.createSubCategory(req.body);
      const resSubCategory = await categoryService.getResSubCategory(newSubCategory.id);
      await logService.createLog({event: ActionEnum.SUB_CATEGORY_CREATE, userId:req.user?._id, data: newSubCategory._id});

      res.json(resSubCategory);
    } catch (e) {
      next(e);
    }
  }
  createSubSubCategory = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const newSubSubCategory = await categoryService.createSubSubCategory(req.body);
      const resSubSubCategory = await categoryService.getResSubSubCategory(newSubSubCategory.id);
      await logService.createLog({event: ActionEnum.SUB_SUB_CATEGORY_CREATE, userId:req.user?._id, data: newSubSubCategory._id});
      res.json(resSubSubCategory);
    } catch (e) {
      next(e);
    }
  }

  // ****************************************************** create ************************************************
  addSubCategory = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const {idCat} = req.body;
      console.log(idCat);
      const sub = req.subcategory as SubCategoryType;
      sub.parentID = idCat;
      await sub.save();
      const updatedCategory = await categoryService.addSubCategoryToCategory(idCat, sub);

      await logService.createLog({event:ActionEnum.ADD_SUB_CATEGORY, userId:req.user?._id, data: sub.id});
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

          await logService.createLog({event:ActionEnum.ADD_SUB_SUB_CATEGORY, userId:req.user?._id, data: subsub.id});
          res.json(updatedCategory);
        }
      }
      // else {res.json({error: 'Unknown error'});}

    } catch (e) {
      return next(e);
    }
  }

  // async createCategory(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     console.log('CategoryController');
  //     console.log(req.body);
  //     const newCategory = await categoryService.createCategory(req.body as Partial<ICategory>);
  //     res.json(newCategory);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  // createSubCategory = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const sub = req.body as Partial<ISubCategory>;
  //     // console.log(sub);
  //     const new_sub = await categoryService.createSubCategory(sub);
  //     // console.log('new_sub');
  //     // console.log(new_sub);
  //     const cat = await categoryService.getCategory(new_sub.parentID as Partial<ICategory>);
  //     cat?.subCategories.push(new_sub);
  //     await cat?.save();
  //     res.json(cat);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  testCreateSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newSubCategory = await categoryService.createSubCategory(req.body as Partial<ISubCategory>);
      res.json(newSubCategory);

      // const sub = req.body as Partial<ISubCategory>;
      // // console.log(sub);
      // const new_sub = await categoryService.createSubCategory(sub);
      // // console.log('new_sub');
      // // console.log(new_sub);
      // const cat = await categoryService.getCategory(new_sub.parentID as Partial<ICategory>);
      // cat?.subCategories.push(new_sub);
      // await cat?.save();
      // res.json(cat);
    } catch (e) {
      next(e);
    }
  }

  // async createSubCategory(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const sub = req.body as Partial<ISubCategory>;
  //     // console.log(sub);
  //     const new_sub = await categoryService.createSubCategory(sub);
  //     // console.log('new_sub');
  //     // console.log(new_sub);
  //     const cat = await categoryService.getCategory(new_sub.parentID as Partial<ICategory>);
  //     cat?.subCategories.push(new_sub);
  //     await cat?.save();
  //     res.json(cat);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  // createSubSubCategory = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const subsub = req.body as Partial<ISubSubCategory>;
  //     const new_subsub = await categoryService.createSubSubCategory(subsub);
  //     const sub = await categoryService.getSubCategory(subsub.parentID as Partial<ISubCategory>);
  //     sub?.subSubCategories.push(new_subsub);
  //     await sub?.save();
  //     const cat = await categoryService.getCategory(sub?.parentID as Partial<ICategory>);
  //     const updatedCategory = await categoryService.updateCategoryBySubCategory(cat as CategoryType, sub as ISubCategory);
  //     res.json(updatedCategory);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
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
  async GetAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      // console.log('///////////////////////////////////////////////////////');
      const categories = await categoryService.getCategories();
      res.json(categories);

    } catch (e) {
      next(e);
    }

  }

  //get all Sub Categories
  async GetAllSubCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const subcategories = await categoryService.getSubCategories();
      res.json(subcategories);

    } catch (e) {
      next(e);
    }
  }

  //get all Sub Sub Categories
  async GetAllSubSubCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const subsubcategories = await categoryService.getSubSubCategories();
      res.json(subsubcategories);

    } catch (e) {
      next(e);
    }
  }

  //get Category by its title
  async GetCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.getCategoryByTitle(req.query.title as string);
      res.json(category);
    } catch (e) {
      next(e);
    }
  }

  //get SubCategory by its title
  async GetSubCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const subcategory = await categoryService.getSubCategoryByTitle(req.query.title as string);
      res.json(subcategory);
    } catch (e) {
      next(e);
    }
  }

  //get SubSubCategory by its title
  async GetSubSubCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const subsubcategory = await categoryService.getSubSubCategoryByTitle(req.query.title as string);
      res.json(subsubcategory);
    } catch (e) {
      next(e);
    }
  }

  // ****************************************************** delete ************************************************
  // delete Category===============================================================================================
  async DeleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = req.body as ICategory;
      // console.log(category);
      for (const sub of category.subCategories) {
        await categoryService.removeSubSubCategory(sub.id);
      }

      // await categoryService.removeSubSubCategory(category);
      await categoryService.removeSubCategory({parentID: category.id});

      const deletedCategory = await categoryService.removeCategory({id: category.id});
      res.json(deletedCategory);
    } catch (e) {
      next(e);
    }
  }

  // delete Sub Category ==========================================================================================
  async deleteSubCategory(req: Request, res: Response, next: NextFunction) {
    try {
      // const subcategory = req.body.title as ISubCategory;
      const subcategory = req.body as ISubCategory;
      // console.log(subcategory);
      await categoryService.removeOneSubCategory({id: subcategory.id});
      await categoryService.removeSubSubCategoryFromOneSubCategory({parentID: subcategory.id});
      await categoryService.removeOneSubCategoryFromCategory(subcategory);
      res.json({message: 'done'});
    } catch (e) {
      next(e);
    }
  }

  // delete Sub Sub Category ======================================================================================
  async deleteSubSubCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const subsubcategory = req.body as ISubSubCategory;
      await categoryService.removeOneSubSubCategory(subsubcategory.id);
      const updatedSubCategory = await categoryService.removeOneSubSubCategoryFromSubCategory(subsubcategory);
      await updatedSubCategory?.save();
      const cat = await categoryService.getCategory(updatedSubCategory?.parentID as Partial<ICategory>);

      const updatedCategory = categoryService.updateCategoryBySubCategory(cat as CategoryType, updatedSubCategory as ISubCategory);
      res.json(updatedCategory);

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
      // console.log(req.body);
      // console.log(req.params);

      const sub_id = +req.params.cat_id as Partial<ISubCategory>;
      const sub = req.body;
      const updatedSubCategory = await categoryService.updateSubCategory(sub_id, sub);
      const cat = await categoryService.getCategory(updatedSubCategory?.parentID as Partial<ICategory>);
      const updatedCategory = await categoryService.updateCategoryBySubCategory(cat as CategoryType, updatedSubCategory as ISubCategory);

      await logService.createLog({event: ActionEnum.ADD_SUB_SUB_CATEGORY, userId:req.user?._id, data: sub_id})

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
      await logService.createLog({event: ActionEnum.ADD_SUB_CATEGORY, userId:req.user?._id, data: sub_sub_id});
      res.json(updatedCategory);

    } catch (e) {
      next(e);
    }
  }

  // async test(req: Request, res: Response, next: NextFunction) {
  //   console.log(req.body);
  //   await res.json({message: 'done!'});
  // }

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
}

export const categoryController = new CategoryController();
