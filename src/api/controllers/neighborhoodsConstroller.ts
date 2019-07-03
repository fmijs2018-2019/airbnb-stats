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
	
	getAllSimple: (req: express.Request, res: express.Response): any => {
		neighborhoodService.getNeighborhoodsSimpleDto()
			.then(data => {
				res.json(data);
			}).catch(err => {
				res.status(500).send(err);
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
					res.json(result);
				}
			}).catch(err => {
				res.status(500).send(err);
			});
	},
	
	getAllTypesOfRatingReportsDetailedByNgId: (req: express.Request, res: express.Response): any => {
		const neighborhoodId: number = req.params['id'];

		neighborhoodService.getAllTypesOfRatingReportsById(neighborhoodId)
		.then(result => {
			if (result === null) {
				res.status(404).send();
			} else {
				res.json(result);
			}
		}).catch(err => {
			res.status(500).send(err);
		});
	},

	getAvailabilityReportByNgId: (req: express.Request, res: express.Response): any => {
		const neighborhoodId: number = req.params['id'];

		neighborhoodService.getAvailabilityReportsById(neighborhoodId)
		.then(result => {
			if (result === null) {
				res.status(404).send();
			} else {
				res.json(result);
			}
		}).catch(err => {
			res.status(500).send(err);
		});
	},

	getAvgPriceReportByNgId: (req: express.Request, res: express.Response): any => {
		const neighborhoodId: number = req.params['id'];

		neighborhoodService.getPriceReportsById(neighborhoodId)
		.then(result => {
			if (result === null) {
				res.status(404).send();
			} else {
				res.json(result);
			}
		}).catch(err => {
			res.status(500).send(err);
		});
	}
}