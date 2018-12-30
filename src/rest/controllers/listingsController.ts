import express from 'express';
import { db } from '../../database';
import { IListing } from '../../database/models/listings';

export default {
    getLocations: (req: express.Request, res: express.Response): any => {
        db.Listings.findAll({
            attributes: ['id', 'latitude', 'longitude', 'roomTypeId', 'neighborhoodId']
        }).then((data: IListing[]) => {
            res.json(data);
        })
    } 
}