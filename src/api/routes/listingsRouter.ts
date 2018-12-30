import express from 'express';
import listingsController from '../controllers/listingsController';

const listingsRouter = express.Router();

listingsRouter.get('/locations', listingsController.getLocations);

listingsRouter.get('', listingsController.getAll);

export default listingsRouter;