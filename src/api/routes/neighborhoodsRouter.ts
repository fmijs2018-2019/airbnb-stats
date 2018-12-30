import * as express from 'express'; 
import neighborhoodsConstroller from '../controllers/neighborhoodsConstroller';

const neighborhoodsRouter = express.Router();

neighborhoodsRouter.get('', neighborhoodsConstroller.getAll);
neighborhoodsRouter.get('/:id', neighborhoodsConstroller.getItem);
neighborhoodsRouter.get('/:id/reports', neighborhoodsConstroller.getItemReports);

export default neighborhoodsRouter;
