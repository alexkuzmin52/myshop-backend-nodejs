import * as multer from 'multer';
import {ProductType} from '../../../database';
import {IRequestExtended} from '../../../models';
import * as fs from 'fs-extra';

const storage = multer.diskStorage({
  destination: (req: IRequestExtended, file, callback) => {
    const {title} = req.product as ProductType;
    const path = `public/product/${title}`;

    if (!fs.pathExistsSync(path)) {
      fs.mkdirSync(path);
    }

    callback(null, path);
  },

  filename: (req, file, callback) => {
    req.body.photo = file.originalname;
    callback(null, file.originalname);
  }
});

const fileFilter = (req: any, file: Express.Multer.File, callback: any) => {

  if (file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(new Error('Image uploaded is not of type jpg/jpeg or png'), false);
  }
};

export const uploadProduct = multer({storage, limits: {fileSize: 10000000}, fileFilter});
