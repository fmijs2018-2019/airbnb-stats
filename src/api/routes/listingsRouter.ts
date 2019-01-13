import express from 'express';
import listingsController from '../controllers/listingsController';

const listingsRouter = express.Router();

listingsRouter.get('/locations', listingsController.getLocations);
listingsRouter.get('/filters-data', listingsController.getFiltersData);
listingsRouter.get('', listingsController.getAll);

export default listingsRouter;