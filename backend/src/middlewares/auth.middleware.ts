import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { ApiError } from '../utils/api.error';
import 'multer'; // <-- Wajib agar tipe Express.Multer.File dikenali

export interface AuthRequest extends Request {
  user?: { id: number };
  file?: Express.Multer.File;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Access denied, token not found'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return next(new ApiError(401, 'Token is invalid or has expired'));
  }
};