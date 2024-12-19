import { Injectable, StreamableFile } from '@nestjs/common';
import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  constructor() {}

  async uploadFiles(file: multer.File): Promise<void> {
    const uploadPath = path.join(
      __dirname,
      '../../',
      'uploads',
      file.originalname,
    );
    await fs.promises.writeFile(uploadPath, file.buffer);
  }

  async getFileNames(): Promise<string[]> {
    return await fs.promises.readdir(path.join(__dirname, '../../', 'uploads'));
  }

  async getFile(fileName: string): Promise<StreamableFile> {
    const file = await fs.createReadStream(
      path.join(__dirname, '../../', 'uploads', fileName),
    );
    return new StreamableFile(file);
  }
}
