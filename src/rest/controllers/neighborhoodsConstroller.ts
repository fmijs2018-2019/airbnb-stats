import * as express from 'express';
import { db } from '../../database';
import { INeighborhood } from '../../database/models/neighborhoods';

export default {
    getNeighborhoods: (req: express.Request, res: express.Response): any => {
        db.Neighborhoods.findAll()
            .then((data: INeighborhood[]) => {
                res.json(data);
            })
    }
}