import express from 'express';
import listingsController from '../controllers/listingsController';
import { checkJwt } from '../../checkJwt';

const listingsRouter = express.Router();

listingsRouter.get('/locations', listingsController.getLocations);
listingsRouter.get('/filters-data', checkJwt, listingsController.getFiltersData);
listingsRouter.get('', checkJwt, listingsController.getAll);
listingsRouter.get('/:id', listingsController.getListingDetailed);

export default listingsRouter;