import * as express from 'express';
import { db } from '../../database';
import { INeighborhood } from '../../database/models/neighborhoods';
import sequelize from 'sequelize';

export default {
    getAll: (req: express.Request, res: express.Response): any => {
        db.Neighborhoods.findAll()
            .then((data: INeighborhood[]) => {
                res.json(data);
            })
    },

    getReportsForAll: (req: express.Request, res: express.Response): any => {
        const byRoomType = db.Listings.findAll({
            group: ['room_type_id'],
            attributes: [['room_type_id', 'name'], [sequelize.fn('COUNT', 'room_type_id'), 'value']],
        });

        const byPropertyType = db.Listings.findAll({
            group: ['property_type_id'],
            attributes: [['property_type_id', 'name'], [sequelize.fn('COUNT', 'property_type_id'), 'value']]
        });

        Promise.all([byRoomType, byPropertyType])
            .then(function (data) {
                const reports = {
                    byRoomType: data[0],
                    byPropertyType: data[1]
                }
                res.json(reports);
            })
            .catch(err => res.send(err));
    },

    getItem: (req: express.Request, res: express.Response): any => {
        const neighborhoodId: number = req.params['id'];

        db.Neighborhoods.findById(neighborhoodId)
            .then((data: INeighborhood | null) => {
                res.json(data);
            });
    },

    getItemReports: (req: express.Request, res: express.Response): any => {
        const neighborhoodId: number = req.params['id'];

        const byRoomType = db.Listings.findAll({
            group: ['room_type_id'],
            where: { 'neighborhoodId': neighborhoodId },
            attributes: [['room_type_id', 'name'], [sequelize.fn('COUNT', 'id'), 'value']],
        });

        const byPropertyType = db.Listings.findAll({
            group: ['property_type_id'],
            where: { 'neighborhoodId': neighborhoodId },
            attributes: [['property_type_id', 'name'], [sequelize.fn('COUNT', 'property_type_id'), 'value']]
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
