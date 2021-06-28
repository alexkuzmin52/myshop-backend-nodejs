import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as path from 'path';
import * as rateLimit from 'express-rate-limit';

import {NextFunction, Request, Response} from 'express';
import {ResponseStatusCodeEnum} from './constants';
import {authRouter, cartRouter, categoryRouter, orderRouter, productRouter, userRouter} from './routes';
import {config} from './config';
import {testCategoryRouter} from './routes';

dotenv.config();

const serverRequestLimit = rateLimit({
  windowMs: config.serverRateLimits.maxRequests,
  max: config.serverRateLimits.maxRequests
}); //TODO

class App {
  public readonly app: express.Application = express();

  constructor() {
    (global as any).appRoot = path.resolve(process.cwd(), '../');
    this.app.use(express.static(path.resolve((global as any).appRoot, 'public')));
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(morgan('dev'));
    this.app.use(serverRequestLimit);
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
    this.app.use(cors({origin: this.configCors}));
    // this.app.use(cors());
    this.mountRoutes();
    this.setupDB();
    this.app.use(this.customErrorHandler);

  }

  private setupDB(): void {
    mongoose.connect(config.MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    const db = mongoose.connection;

    db.on('error', console.log.bind(console, 'MONGO ERROR'));
  }

  private configCors = (origin: any, callback: any) => {
    const whitelist = config.ALLOWED_ORIGIN;

    if (!origin) {
      return callback(null, true);
    }

    if (!whitelist.includes(origin)) {
      return callback(new Error('Cors not allowed'), false);
    }

    return callback(null, true);
  }

  private mountRoutes(): void {
    this.app.use('/auth', authRouter);
    this.app.use('/cart', cartRouter);
    this.app.use('/category', categoryRouter);
    this.app.use('/order', orderRouter);
    this.app.use('/product', productRouter);
    this.app.use('/testcategory', testCategoryRouter);//TODO
    this.app.use('/user', userRouter);
    // this.app.use('', appRouter);

  }

  private customErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction) {
    res
      .status(err.status || ResponseStatusCodeEnum.SERVER)
      .json({
        message: err.message,
        code: err.code
      });
  }
}

export const app = new App().app;
