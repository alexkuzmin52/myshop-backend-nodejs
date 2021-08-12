import * as fs from 'fs-extra';
import {parse} from '@fast-csv/parse';

export const csvParserHelper = (csvFilePath: string): Promise<Array<string>> => {
  return new Promise((resolve, reject)=>{
    const products: Array<string> = [];

    fs.createReadStream(csvFilePath)
      .pipe(parse({headers: true, ignoreEmpty: true}))
      .on('error', (err: Error) => {
        reject(err);
      })
      .on('data', (chunk => {
        products.push(chunk);
      }))
      .on('end', () => {
        resolve(products);
      });
  });
};
