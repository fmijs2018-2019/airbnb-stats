import * as express from 'express';
import db from '../../database/Db';
import { INeighborhoodAttributes } from '../../database/models/neighborhoods';

export default {
    getAll: (req: express.Request, res: express.Response): any => {
        db.Neighborhoods.findAll()
            .then((data: INeighborhoodAttributes[]) => {
                res.json(data);
            })
    },

    getItem: (req: express.Request, res: express.Response): any => {
        const neighborhoodId: number = req.params['id'];

        db.Neighborhoods.findById(neighborhoodId)
            .then((data) => {
                res.json(data);
            });
    },

    getItemReports: (req: express.Request, res: express.Response): any => {
        const neighborhoodId: number = req.params['id'];

        const byRoomType = db.Listings.findAll({
            group: ['room_type_id'],
            where: { 'neighborhoodId': neighborhoodId },
            attributes: [['room_type_id', 'name'], [db.sequelize.fn('COUNT', 'id'), 'value']],
        });

        const byPropertyType = db.Listings.findAll({
            group: ['property_type_id'],
            where: { 'neighborhoodId': neighborhoodId },
            attributes: [['property_type_id', 'name'], [db.sequelize.fn('COUNT', 'property_type_id'), 'value']]
        });

        Promise.all([byRoomType, byPropertyType])
            .then(function (data) {
                const itemReports = {
                    byRoomType: data[0],
                    byPropertyType: data[1]
                }
                res.json(itemReports);
            })
            .catch(err => res.send(err));
    }
}
