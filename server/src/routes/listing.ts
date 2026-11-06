import { Router, Request, Response } from 'express';
import { listingData, allListings } from '../data/listingData.js';

export const listingRouter = Router();

listingRouter.get('/', (req: Request, res: Response) => {
  const city = (req.query.city as string)?.toLowerCase();
  if (city) {
    if (city.includes('calangute') && allListings.calangute) {
      return res.json({ success: true, data: allListings.calangute });
    }
    if (city.includes('anjuna') && allListings.anjuna) {
      return res.json({ success: true, data: allListings.anjuna });
    }
    if (city.includes('panaji') && allListings.panaji) {
      return res.json({ success: true, data: allListings.panaji });
    }
    if (city.includes('candolim') && allListings.candolim) {
      return res.json({ success: true, data: allListings.candolim });
    }
  }
  return res.json({
    success: true,
    data: listingData
  });
});

listingRouter.get('/all', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: Object.values(allListings)
  });
});

listingRouter.get('/photos', (req: Request, res: Response) => {
  const { room, city } = req.query;
  const currentListing = (city && typeof city === 'string' && (allListings as any)[city.toLowerCase()]) || listingData;
  if (room && typeof room === 'string') {
    const filtered = currentListing.photos.filter((p: any) => p.roomId === room);
    return res.json({ success: true, count: filtered.length, data: filtered });
  }
  return res.json({ success: true, count: currentListing.photos.length, data: currentListing.photos });
});

listingRouter.get('/amenities', (req: Request, res: Response) => {
  const city = req.query.city as string;
  const currentListing = (city && typeof city === 'string' && (allListings as any)[city.toLowerCase()]) || listingData;
  res.json({
    success: true,
    count: currentListing.amenities.length,
    data: currentListing.amenities
  });
});
