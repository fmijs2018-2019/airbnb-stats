import * as express from 'express';
import db from '../../database/Db';
import { INeighborhoodAttributes } from '../../database/models/neighborhoods';

export default {
    getNeighborhoods: (req: express.Request, res: express.Response): any => {
        db.Neighborhoods.findAll()
            .then((data: INeighborhoodAttributes[]) => {
                res.json(data);
            })
    }
}