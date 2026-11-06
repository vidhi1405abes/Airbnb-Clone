import { Router, Request, Response } from 'express';
import { reviewsData, listingData } from '../data/listingData.js';

export const reviewsRouter = Router();

reviewsRouter.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    ratings: listingData.ratings,
    count: reviewsData.length,
    data: reviewsData
  });
});
