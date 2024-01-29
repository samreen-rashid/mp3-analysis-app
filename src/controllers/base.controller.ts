import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { FileService } from '@/services/base.service';

export class BaseController {
  public user = Container.get(FileService);

  public calculateFrames = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const file = req.file;
      const frame = await this.user.calculateFrames(file.buffer);
      res.status(200).json({ data: frame, message: 'frame count' });
    } catch (error) {
      next(error);
    }
  };
}
