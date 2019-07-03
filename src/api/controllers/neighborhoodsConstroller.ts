import * as express from 'express';
import db from '../../database/Db';
import { INeighborhoodAttributes } from '../../database/models/neighborhoods';
import _ from 'lodash';
import { neighborhoodService } from '../../services/neighborhoodService';

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
		neighborhoodService.getAllRepots()
			.then(ngReports => {
				res.json(ngReports);
			}).catch(err => {
				res.status(500).send(err);
			});
    },

    getItemReports: (req: express.Request, res: express.Response): any => {
		const neighborhoodId: number = req.params['id'];
		
		neighborhoodService.getRepotsById(neighborhoodId)
			.then(result => {
				if (result === null) {
					res.status(404).send();
				} else {
					res.send(result);
				}
			}).catch(err => {
				res.status(500).send(err);
			});

        // const byRatingPromise = db.Listings.findAll({
        //     attributes: [['review_scores_rating', 'rating'], [db.sequelize.fn('COUNT', 'listings.id'), 'count']],
        //     where: { 'neighborhoodId': neighborhoodId },
        //     group: ['review_scores_rating'],
        //     raw: true
        // });

        // const byRoomTypePromise = db.Listings.findAll({
        //     attributes: ['listings.neighborhood_id', 'neighborhood.name', 'roomType.type', 'roomType.id', [db.sequelize.fn('COUNT', 'listings.id'), 'count']],
        //     include: [
		// 		{ model: db.RoomTypes, as: 'roomType', attributes: [] },
		// 		{ model: db.Neighborhoods, as: 'neighborhood', attributes: [] }
        //     ],
        //     where: { 'neighborhoodId': neighborhoodId },
        //     group: ['roomType.type', 'roomType.id'],
        //     raw: true
        // });

        // const byPropertyTypePromise = db.Listings.findAll({
        //     attributes: ['propertyType.type', 'propertyType.id', [db.sequelize.fn('COUNT', 'listings.id'), 'count']],
        //     include: [
        //         { model: db.PropertyTypes, as: 'propertyType', attributes: [] }
        //     ],
        //     where: { 'neighborhoodId': neighborhoodId },
        //     group: ['propertyType.type', 'propertyType.id'],
        //     raw: true
        // });

        // Promise.all([byRoomTypePromise, byPropertyTypePromise, byRatingPromise])
        //     .then(([byRoomType, byPropertyType, byRating]) => {
        //         const itemReports = {
		// 			id: neighborhoodId,
		// 			name: (byRoomType && byRoomType.length) ? byRoomType : '',
        //             byRoomType,
        //             byPropertyType,
        //             byRating
        //         }
        //         res.json(itemReports);
        //     })
        //     .catch(err => { res.send(err) });
    },
}