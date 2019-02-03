import express from 'express';
import sequelize = require('sequelize');
import db from '../../database/Db';
import _ from 'lodash';

export default {
    getLocations: (req: express.Request, res: express.Response): any => {
        db.Listings.findAll({
            attributes: ['id', ['latitude', 'lat'], ['longitude', 'lon'], ['room_type_id', 'rId'], ['neighborhood_id', 'ngId']],
            raw: true
        }).then((data: any) => {
            res.json(data);
        })
    },

    getAll: (req: express.Request, res: express.Response) => {
        const neighFilter: number[] = req.query['neighs'] || null;
        const ptFilter: number[] = req.query['prop_types'] || null;
        const rtFilter: number[] = req.query['room_types'] || null;
        const fromDate = req.query['from_date'] || null;
        const toDate = req.query['to_date'] || null;
        const fromPrice = req.query['from_price'] || null;
        const toPrice = req.query['to_price'] || null;
        const skip:number = req.query['skip'] || 0;
        const take: number = req.query['take'] || 50;
        const orderBy: number = req.query['order_by'] || 0;

        const query =
            `select * 
            from get_listings(
                skip => ${skip}, 
                take => ${take},
                from_date => ${fromDate ? `'${fromDate}'` : null},
                to_date => ${toDate ? `'${toDate}'` : null},
                from_price => ${fromPrice},
                to_price => ${toPrice},
                n_ids => ${neighFilter ? `array[${neighFilter.toString()}]` : null}, 
                pt_ids => ${ptFilter ? `array[${ptFilter.toString()}]` : null},
                rt_ids => ${rtFilter ? `array[${rtFilter.toString()}]` : null},
                order_by => '${orderBy}');`;

        db.sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
            .then((data: any[]) => {
                const first = data.find(() => true);
                const totalCount = first && +first['t_count'] || 0;
                data.forEach(v => delete v['t_count']);

                res.status(200).send({
                    total_count: totalCount,
                    listings: data
                });
            }).catch((error) => {
                res.status(400).send(error);
            })
    },

    getFiltersData: (req: express.Request, res: express.Response) => {
        const roomTypesPromise = db.RoomTypes.findAll({ raw: true });
        const propertyTypesPromise = db.PropertyTypes.findAll({ raw: true });
        const neighborhoodsPromise = db.Neighborhoods.findAll({ 
            attributes: ['id', 'name'],
            raw: true
        });

        Promise.all([roomTypesPromise, propertyTypesPromise, neighborhoodsPromise])
            .then(([roomTypes, propertyTypes, neighborhoods]) => {
                const filterData = {
                    roomTypes,
                    propertyTypes,
                    neighborhoods,
                }

                res.json(filterData);
            })
            .catch(err => res.status(400).send(err));
    }
}