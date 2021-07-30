import * as multer from 'multer';
import * as fs from 'fs-extra';
import {IRequestExtended} from '../../../models';
import {CategoryType} from '../../../database';

const storage = multer.diskStorage(
  {
    destination: (req: IRequestExtended, file, callback) => {
      const {title} = req.category as CategoryType;
      const path = `public/category/${title}`;
      if (!fs.pathExistsSync(path)) {
        fs.mkdirSync(path);
      }
      callback(null, path);
    },
    filename: (req: any, file: any, callback: any) => {
      req.body.logo = file.originalname;
      console.log(req.body.logo);
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

export const uploadCategory = multer({storage, limits: {fileSize: 1000000}, fileFilter});

