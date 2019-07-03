import * as express from 'express'; 
import neighborhoodsConstroller from '../controllers/neighborhoodsConstroller';

const neighborhoodsRouter = express.Router();

neighborhoodsRouter.get('', neighborhoodsConstroller.getAll);
neighborhoodsRouter.get('/simple', neighborhoodsConstroller.getAllSimple);
neighborhoodsRouter.get('/reports', neighborhoodsConstroller.getReports);
neighborhoodsRouter.get('/:id', neighborhoodsConstroller.getItem);
neighborhoodsRouter.get('/:id/reports', neighborhoodsConstroller.getItemReports);
neighborhoodsRouter.get('/:id/reports/rating', neighborhoodsConstroller.getAllTypesOfRatingReportsDetailedByNgId);
neighborhoodsRouter.get('/:id/reports/availability', neighborhoodsConstroller.getAvailabilityReportByNgId);
neighborhoodsRouter.get('/:id/reports/price', neighborhoodsConstroller.getAvgPriceReportByNgId);

export default neighborhoodsRouter;
