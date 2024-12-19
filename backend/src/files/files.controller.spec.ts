import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { StreamableFile } from '@nestjs/common';
import * as multer from 'multer';

describe('FilesController', () => {
  let controller: FilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [FilesService],
    }).compile();

    controller = module.get<FilesController>(FilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
describe('FilesController', () => {
  let controller: FilesController;
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [
        {
          provide: FilesService,
          useValue: {
            uploadFiles: jest.fn(),
            getFileNames: jest
              .fn()
              .mockResolvedValue(['file1.txt', 'file2.txt']),
            getFile: jest
              .fn()
              .mockResolvedValue(
                new StreamableFile(Buffer.from('file content')),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<FilesController>(FilesController);
    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should call FilesService.uploadFiles with the uploaded file', async () => {
      const file: multer.File = {
        buffer: Buffer.from('test file'),
        originalname: 'test.txt',
        mimetype: 'text/plain',
        size: 100,
        stream: null,
        destination: '',
        filename: '',
        path: '',
        fieldname: 'file',
        encoding: '7bit',
      };

      await controller.uploadFile(file);
      expect(service.uploadFiles).toHaveBeenCalledWith(file);
    });
  });

  describe('getFilesNames', () => {
    it('should return an array of file names', async () => {
      const result = await controller.getFilesNames();
      expect(result).toEqual(['file1.txt', 'file2.txt']);
    });
  });

  describe('getFile', () => {
    it('should return a StreamableFile', async () => {
      const fileName = 'file1.txt';
      const result = await controller.getFile(fileName);
      expect(result).toBeInstanceOf(StreamableFile);
      expect(service.getFile).toHaveBeenCalledWith(fileName);
    });
  });
});
