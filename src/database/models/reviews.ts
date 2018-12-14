import { sequelize } from '../config';
import Sequelize from 'sequelize';
import { Listings } from './listings';

export const Reviews = sequelize.define('reviews',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        listingId: {
            type: Sequelize.INTEGER,
            references: {
                model: Listings,
                key: 'id'
            },
            field: 'listing_id'
        },
        date: {
            type: Sequelize.DATE
        },
    },
    {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false
    }
)