import path from 'path';
import fs from 'fs';

export const buildFullPath = (filename) => path.join(path.resolve(process.cwd()), '/__fixtures__', filename);

export const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

export const defineFileType = (filePath) => {
  const fileType = path.extname(filePath).slice(1);
  return fileType;
};
