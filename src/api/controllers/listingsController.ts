import express from 'express';
import sequelize = require('sequelize');
import db from '../../database/Db';

export default {
    getLocations: (req: express.Request, res: express.Response): any => {
        db.Listings.findAll({
            attributes: ['id', 'latitude', 'longitude', 'roomTypeId', 'neighborhoodId']
        }).then((data) => {
            res.json(data);
        })
    },

    getAll: (req: express.Request, res: express.Response) => {
        const neighFilter: number[] = req.query['neighs'] || null;
        const ptFilter: number[] = req.query['prop_types'] || null;
        const rtFilter: number[] = req.query['room_types'] || null;
        const fromDate = req.query['from_date'] || null;
        const toDate = req.query['to_date'] || null;
        const skip = req.query['skip'] || 0;
        const take = req.query['take'] || 50;

        const query = 
            `select * 
            from get_listings(
                skip => ${skip}, 
                take => ${take},
                from_date => ${fromDate},
                to_date => ${toDate},
                n_ids => ${neighFilter ? `array[${neighFilter.toString()}]` : null}, 
                pt_ids => ${ptFilter ? `array[${ptFilter.toString()}]` : null},
                rt_ids => ${rtFilter ? `array[${rtFilter.toString()}]` : null});`;

        db.sequelize.query(query, {type: sequelize.QueryTypes.SELECT })
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
    }
}