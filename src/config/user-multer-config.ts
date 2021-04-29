import * as multer from 'multer';
// import {Request} from "express";
// import {Request} from 'express';
// import {NextFunction} from 'express';

const storage = multer.diskStorage(
  {
    destination: (req, file, callback) => {

      callback(null, 'public/users/');
    },
    filename: (req: any, file: any, callback: any) => {
      // console.log(req.body);
      // console.log(file.originalname);
      req.body.photo=file.originalname;
      // console.log(req.body);
      // callback(null, file.originalname +'_'+ Date.now());
      callback(null, file.originalname);

    }
    // filename(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
    // }
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
// export const setPhoto = (req: any, res: any, next: NextFunction):any=>{
//   console.log(req.fileName);
//   console.log(req.body);
//   req.filename = req.fileName;
//   next();
// };

export const upload = multer({storage, limits: {fileSize: 1000000},fileFilter});
