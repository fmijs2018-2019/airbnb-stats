import { sequelize } from '../config';
import Sequelize from 'sequelize';
import { Listings } from './listings';

export const Calendars = sequelize.define('calendars',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        listingId: {
            type: Sequelize.INTEGER,
            field: 'listing_id',
            references: {
                model: Listings,
                key: 'id'
            },
        },
        date: {
            type: Sequelize.DATE
        },
        available: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        }
    },
    {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false
    });
