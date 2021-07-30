import * as multer from 'multer';
// import {CategoryType} from '../../../database';
import * as fs from 'fs-extra';
import {IRequestExtended, ISubSubCategory} from '../../../models';

const storage = multer.diskStorage(
  {
    destination: (req: IRequestExtended, file, callback) => {
      const {title} = req.subsubcategory as ISubSubCategory; //TODO Type
      const path = `public/subsubcategory/${title}`;
      if (!fs.existsSync(path)) {
        fs.mkdirsSync(path);
      }
      callback(null, path);
    },
    filename: (req: any, file: any, callback: any) => {
      req.body.logo = file.originalname;
      callback(null, file.originalname);
    }
  }
);

const fileFilter = (req: any, file: any, callback: any) => {
  if (file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(new Error('Image uploaded is not of type jpg/jpeg or png'), false);
  }
};

export const uploadSubSubCategory = multer({storage, limits: {fileSize: 1000000}, fileFilter});

