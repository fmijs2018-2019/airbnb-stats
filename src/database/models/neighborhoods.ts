import { sequelize } from '../config';
import Sequelize from 'sequelize';

export interface INeighborhood {
    id: number,
    name: string,
    geoJson: object,
    centerLongitude: number,
    centerLatitude: number,
    zoom: number
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
        },
        geoJson: {
            type: Sequelize.JSON,
            field: 'geo_json'
        },
        centerLongitude: {
            type: Sequelize["DOUBLE PRECISION"],
            field: 'center_longitude'
        },
        centerLatitude: {
            type: Sequelize["DOUBLE PRECISION"],
            field: 'center_latitude'
        },
        zoom: {
            type: Sequelize.FLOAT,
        }
    },
    {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false
    });
