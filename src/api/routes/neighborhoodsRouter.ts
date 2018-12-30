import * as express from 'express'; 
import neighborhoodsConstroller from '../controllers/neighborhoodsConstroller';

const neighborhoodsRouter = express.Router();

neighborhoodsRouter.get('', neighborhoodsConstroller.getNeighborhoods);

export default neighborhoodsRouter;
