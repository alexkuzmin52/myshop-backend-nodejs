import {parse} from '@fast-csv/parse';
import * as fs from 'fs';

export const csvParserHelper = (csvFilePath: string): Promise<Array<string>> => {
  return new Promise((resolve, reject)=>{
    const categories: Array<string> = [];
    console.log('csvFilePath');
    console.log(csvFilePath);

    fs.createReadStream(csvFilePath)
      .pipe(parse({headers: true, ignoreEmpty: true}))
      .on('error', (err: Error) => {
        reject(err);
      })
      .on('data', (chunk => {
        categories.push(chunk);
      }))
      .on('end', () => {
        console.log(categories);
        resolve(categories);
        // return categories;
      });
  });
};
