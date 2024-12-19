import {
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async uploadFile(@UploadedFile() file: multer.File) {
    await this.filesService.uploadFiles(file);
  }

  @Get('list')
  async getFilesNames(): Promise<string[]> {
    return await this.filesService.getFileNames();
  }

  @Get('/:fileName')
  async getFile(@Param('fileName') fileName: string): Promise<StreamableFile> {
    const file = await this.filesService.getFile(fileName);
    return file;
  }
}
