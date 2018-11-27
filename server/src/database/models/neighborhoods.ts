import { sequelize } from '../config';
import Sequelize from 'sequelize';

export const Neighborhoods = sequelize.define('neighborhoods',
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
