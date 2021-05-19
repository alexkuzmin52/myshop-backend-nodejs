import * as multer from 'multer';

const storage = multer.diskStorage(
  {
    destination: (req, file, callback) => {
      callback(null, 'public/users/');
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

export const upload = multer({storage, limits: {fileSize: 1000000},fileFilter});
