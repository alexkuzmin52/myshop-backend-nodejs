import * as multer from 'multer';

const storage = multer.diskStorage(
  {
    destination: (req, file, callback) => {

      callback(null, 'public/category/');
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

export const uploadCategory = multer({storage, limits: {fileSize: 1000000}, fileFilter});

