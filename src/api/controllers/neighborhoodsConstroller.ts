import * as express from 'express';
import db from '../../database/Db';
import { INeighborhoodAttributes } from '../../database/models/neighborhoods';
import _ from 'lodash';
import { INeighborhoodReports } from '../../contracts/reports';

interface IReport {
    neighborhood_id: number;
    name: string;
    type: string;
    property_type: string;
    count: number;
}

const mapReportsToViewModel = (reports: { byRoomType: any[], byPropType: any[] }): any[] => {
    const ngById: any = {};

    reports.byRoomType.forEach(r => {
        if (!ngById[r.neighborhood_id.toString()]) {
            ngById[r.neighborhood_id] = {
                id: r.neighborhood_id,
                name: r.name,
                byPropType: [],
                byRoomType: [],
            }
        }

        ngById[r.neighborhood_id.toString()].byRoomType.push({
            id: r.room_type_id,
            type: r.type,
            count: r.count,
        })
    });

    reports.byPropType.forEach(r => {
        ngById[r.neighborhood_id.toString()].byPropType.push({
            id: r.property_type_id,
            type: r.type,
            count: r.count,
        })
    });

    return (Object as any).values(ngById);
}

export default {
    getAll: (req: express.Request, res: express.Response): any => {
        db.Neighborhoods.findAll({ raw: true })
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

    getReports: (req: express.Request, res: express.Response): any => {
        const byRoomTypePromise = db.Listings.findAll({
            attributes: ['listings.neighborhood_id', 'neighborhood.name', 'roomType.type', 'listings.room_type_id', [db.sequelize.fn('COUNT', 'listings.id'), 'count']],
            include: [
                { model: db.RoomTypes, as: 'roomType', attributes: [] },
                { model: db.Neighborhoods, as: 'neighborhood', attributes: [] }
            ],
            group: ['listings.neighborhood_id', 'neighborhood.name', 'roomType.type', 'listings.room_type_id'],
            raw: true
        });

        const byPropertyTypePromise = db.Listings.findAll({
            attributes: ['listings.neighborhood_id', 'neighborhood.name', 'propertyType.type', 'listings.property_type_id', [db.sequelize.fn('COUNT', 'listings.id'), 'count']],
            include: [
                { model: db.PropertyTypes, as: 'propertyType', attributes: [] },
                { model: db.Neighborhoods, as: 'neighborhood', attributes: [] }
            ],
            group: ['listings.neighborhood_id', 'neighborhood.name', 'propertyType.type', 'listings.property_type_id'],
            raw: true
        });

        Promise.all([byRoomTypePromise, byPropertyTypePromise])
            .then(([byRoomType, byPropType]: any) => {
                res.json(mapReportsToViewModel({byRoomType, byPropType}));
            })
            .catch(err => { res.send(err) });
    },

    getItemReports: (req: express.Request, res: express.Response): any => {
        const neighborhoodId: number = req.params['id'];

        const byRoomTypePromise = db.Listings.findAll({
            attributes: ['roomType.type', 'roomType.id', [db.sequelize.fn('COUNT', 'listings.id'), 'count']],
            include: [
                { model: db.RoomTypes, as: 'roomType', attributes: [] }
            ],
            where: { 'neighborhoodId': neighborhoodId },
            group: ['roomType.type', 'roomType.id'],
            raw: true
        });

        const byPropertyTypePromise = db.Listings.findAll({
            attributes: ['propertyType.type', 'propertyType.id', [db.sequelize.fn('COUNT', 'listings.id'), 'count']],
            include: [
                { model: db.PropertyTypes, as: 'propertyType', attributes: [] }
            ],
            where: { 'neighborhoodId': neighborhoodId },
            group: ['propertyType.type', 'propertyType.id'],
            raw: true
        });

        Promise.all([byRoomTypePromise, byPropertyTypePromise])
            .then(([byRoomType, byPropertyType]) => {
                const itemReports = {
                    byRoomType,
                    byPropertyType
                }
                res.json(itemReports);
            })
            .catch(err => { res.send(err) });
    },
}
