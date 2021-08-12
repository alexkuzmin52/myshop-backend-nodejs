import * as multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/product/csv');
  },
  filename: (req, file, callback) => {
    req.body.product = file.originalname;
    callback(null, file.originalname);
  }
});

const fileFilter = (req: any, file: Express.Multer.File, callback: any) => {
  if (file.mimetype === 'text/csv') {
    callback(null, true);
  } else {
    callback( Error('File uploaded is not of type text/csv'),false);
  }
};

export const uploadCSVProduct = multer({storage, limits: {fileSize: 1000000}, fileFilter});
