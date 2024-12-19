import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './files.service';
import * as fs from 'fs';
import * as path from 'path';
import * as multer from 'multer';
import { StreamableFile } from '@nestjs/common';

describe('FilesService', () => {
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesService],
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
describe('FilesService', () => {
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesService],
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadFiles', () => {
    it('should upload a file', async () => {
      const file: multer.File = {
        fieldname: 'file',
        originalname: 'test.txt',
        encoding: '7bit',
        mimetype: 'text/plain',
        buffer: Buffer.from('test content'),
        size: 12,
        stream: null,
        destination: '',
        filename: '',
        path: '',
      };

      const writeFileSpy = jest
        .spyOn(fs.promises, 'writeFile')
        .mockResolvedValue();

      await service.uploadFiles(file);

      expect(writeFileSpy).toHaveBeenCalledWith(
        path.join(__dirname, '../../', 'uploads', file.originalname),
        file.buffer,
      );

      writeFileSpy.mockRestore();
    });
  });

  describe('getFile', () => {
    it('should return a StreamableFile', async () => {
      const fileName = 'test.txt';
      const createReadStreamSpy = jest
        .spyOn(fs, 'createReadStream')
        .mockReturnValue({
          pipe: jest.fn(),
        } as any);

      const result = await service.getFile(fileName);

      expect(createReadStreamSpy).toHaveBeenCalledWith(
        path.join(__dirname, '../../', 'uploads', fileName),
      );
      expect(result).toBeInstanceOf(StreamableFile);

      createReadStreamSpy.mockRestore();
    });
  });
});
