import * as multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, callback)=> {
    callback(null, 'public/category/csv');
  },
  filename(req: any, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
    req.body.categories = file.originalname;
    callback(null, file.originalname);
  }
});

const fileFilter = (req: any, file: any, callback: any) => {
  if (file.mimetype === 'text/csv') {
    callback(null, true);
  } else {
    callback( Error('File uploaded is not of type text/csv'),false);
  }
};

export const uploadCSV = multer({storage,limits: {fileSize: 100000},fileFilter});

