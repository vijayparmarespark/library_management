import { Injectable } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig, fileFilter } from './multer.config';

@Injectable()
export class FileUploadInterceptor extends FileInterceptor('profile_image', {
  storage: multerConfig.storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}) {}
