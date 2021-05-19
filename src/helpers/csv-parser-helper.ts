import * as fs from 'fs';
import {parse} from '@fast-csv/parse';

export const csvParserHelper = (csvFilePath: string): Promise<Array<string>> => {
  return new Promise((resolve, reject)=>{
    const categories: Array<string> = [];

    fs.createReadStream(csvFilePath)
      .pipe(parse({headers: true, ignoreEmpty: true}))
      .on('error', (err: Error) => {
        reject(err);
      })
      .on('data', (chunk => {
        categories.push(chunk);
      }))
      .on('end', () => {
        resolve(categories);
      });
  });
};
