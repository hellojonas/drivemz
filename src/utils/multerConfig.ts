import { existsSync, mkdirSync } from 'fs';
import multer, { DiskStorageOptions, FileFilterCallback, Multer } from 'multer';
import { Request } from 'express';
import { randomBytes, createHash } from 'crypto';
import createError from 'http-errors';

export const createStorageOption = (
  destination: string
): DiskStorageOptions => {
  const storageOptions: DiskStorageOptions = {
    destination: (req, file, cb) => {
      if (!existsSync(destination)) {
        mkdirSync(destination, { recursive: true });
      }

      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const rBytes: string = randomBytes(12).toString('hex');
      const hash: string = createHash('sha256')
        .update(rBytes)
        .digest('hex')
        .toString();
      const date = Date.now();
      const name: string = `img-${date}-${hash}.${file.mimetype.split('/')[1]}`;
      req.body.image = name;
      cb(null, name);
    },
  };
  return storageOptions;
};

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!file.mimetype.startsWith('image')) {
    return cb(new createError.BadRequest('File must be an image'));
  }

  cb(null, true);
};

export const createStorage = (destination: string): Multer => {
  return multer({
    storage: multer.diskStorage(createStorageOption(destination)),
    fileFilter,
  });
};
