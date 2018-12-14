import { sequelize } from '../config';
import Sequelize from 'sequelize';

export interface INeighborhood {
    id: number,
    name: string
}

export const Neighborhoods = sequelize.define<INeighborhood, {}>('neighborhoods',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        }
    },
    {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false
    });