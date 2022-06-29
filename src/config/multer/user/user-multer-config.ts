import * as multer from 'multer';
import {IRequestExtended, IUser} from '../../../models';
import * as fs from 'fs-extra';

const storage = multer.diskStorage(
  {
    destination: (req: IRequestExtended, file, callback) => {
      const {_id} = req.user as IUser;
      const path = `public/users/${_id}`;
      if (!fs.pathExistsSync(path)) {
        fs.mkdirSync(path);
      }
      callback(null, path);
    },
    filename: (req: any, file: any, callback: any) => {
      req.body.photo=file.originalname;
      callback(null, file.originalname);
    }
  }
);

const fileFilter = (req: any, file: any, callback: any)=>{
  if (file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'){
    callback(null, true);
  } else {
    callback(new Error('Image uploaded is not of type jpg/jpeg or png'),false);
  }
};

export const uploadUser = multer({storage, limits: {fileSize: 1000000},fileFilter});
