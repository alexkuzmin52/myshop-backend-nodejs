import {NextFunction, Request, Response} from 'express';
import {categoryService} from '../../services';
import {ICategory, ISubCategory, ISubSubCategory} from '../../models';
import {CategoryType} from '../../database';

class TestCategoryController {
  //************************************************************************************************************
  testCreateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('CategoryController');
      console.log(req.body);
      const newCategory = await categoryService.createCategory(req.body as Partial<ICategory>);
      res.json(newCategory);
    } catch (e) {
      next(e);
    }
  }

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

  testCreateSubSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newSubSubCategory = await categoryService.createSubSubCategory(req.body as Partial<ISubSubCategory>);
      res.json(newSubSubCategory);

    } catch (e) {
      next(e);
    }
  }

  //************************************************************************************************************
  addSubToCat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const {subTitle, catTitle} = req.body;
      console.log(req.body);
      const cat = await categoryService.getCategoryByTitle(req.body.catTitle);
      const sub = await categoryService.getSubCategoryByTitle(req.body.subTitle);

      console.log(cat);
      console.log(sub);
      if (cat && sub) {
        sub.parentID = cat.id;
        cat.subCategories.push(sub);
        await sub.save();
        await cat.save();
      }
      res.json(cat);
    } catch (e) {
      return next(e);
    }
  }

  addSubSubToSub = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subSub = await categoryService.getSubSubCategoryByTitle(req.body.subSubTitle);
      const sub = await categoryService.getSubCategoryByTitle(req.body.subTitle);
      // const cut = await categoryService.getCategory(sub?.parentID)
      if (subSub && sub) {

        subSub.parentID = sub.id;
        sub.subSubCategories.push(subSub);
        await subSub.save();
        await sub.save();
        console.log('sub.parentID');
        console.log(sub.parentID);
        const cat = await categoryService.getCategory(sub.parentID as Partial<ICategory>);
        const updatedCategory = await categoryService.updateCategoryBySubCategory(cat as CategoryType, sub as ISubCategory);

        res.json(updatedCategory);
      }

    } catch (e) {
      return next(e);
    }
  }

  //************************************************************************************************************

}
export const testCategoryController = new TestCategoryController();
