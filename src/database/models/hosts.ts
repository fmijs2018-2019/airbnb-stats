import { sequelize } from '../config';
import Sequelize from 'sequelize';

export interface IHost {
    id: number,
    url: string,
    name: string,
    location: string,
    about: string,
    pictureUrl: string,
    listingsCount: number
}

export const Hosts = sequelize.define<IHost, {}>('hosts',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        pictureUrl: {
            type: Sequelize.STRING,
            field: 'picture_url',
        },
        listingsCount: {
            type: Sequelize.INTEGER,
            field: 'listings_count',
            allowNull: true,
        }
    },
    {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false
    });