import { sequelize } from '../config';
import Sequelize from 'sequelize';

export const Hosts = sequelize.define('hosts',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        url: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        about: {
            type: Sequelize.TEXT
        },
        responseRate: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        acceptanceRate: {
            type: Sequelize.STRING
        },
        pictureUrl: {
            type: Sequelize.STRING
        },
        listingsCount: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    },
    {
        freezeTableName: true // Model tableName will be the same as the model name
    });
