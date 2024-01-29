import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import multer from 'multer';
import { BaseController } from '@/controllers/base.controller';


export class ApiRoute implements Routes {
  public path = '/api';
  public router = Router();
  public user = new BaseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    this.router.post(`${this.path}/file-upload`,  upload.single('file'), this.user.calculateFrames);
  }
}
