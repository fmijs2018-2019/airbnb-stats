import express from 'express';
import { db } from '../../database';
import { IListing } from '../../database/models/listings';
import sequelize = require('sequelize');
import { Op } from 'sequelize';

export default {
    getLocations: (req: express.Request, res: express.Response): any => {
        const neighborhood: string = req.query["neighborhood"];

        if(neighborhood && neighborhood.length > 0) {
            db.Listings.findAll({
                where: {
                    neighborhoodId: {
                        [Op.eq]: sequelize.literal(`(select id from neighborhoods where name = '${neighborhood}')`)
                    }
                },
                attributes: ['id', 'latitude', 'longitude', 'roomType']
            }).then((data: IListing[]) => {
                res.json(data);
            })
        } else {
            db.Listings.findAll({
                attributes: ['id', 'latitude', 'longitude', 'roomTypeId']
            }).then((data: IListing[]) => {
                res.json(data);
            })
        }        
    }
}