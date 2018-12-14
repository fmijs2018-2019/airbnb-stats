import { sequelize } from '../config';
import Sequelize from 'sequelize';
import { Hosts } from './hosts';
import { Neighborhoods } from './neighborhoods';
import { PropertyTypes } from './propetyTypes';
import { RoomTypes } from './roomTypes';

export interface IListing {
    id: number;
    url: string;
    name: string;
    description: string;
    neighborhoodOverview: string;
    transit: string;
    access: string;
    houseRules: string;
    pictureUrl: string;
    hostId: number;
    street: string;
    neighborhoodId: number;
    latitude: number;
    longitude: number;
    propertyTypeId: number;
    roomTypeId: number,
    accommodates?: number;
    bathrooms?: number;
    bedrooms?: number;
    beds?: number;
    price?: number;
    weeklyPrice?: number;
    mountlyPrice?: number;
    minimumNights?: number;
    maximumNights?: number;
    availability?: number;
    numberOfReviews?: number;
    reviewScoresRating?: number;
    reviewScoresAccuracy?: number;
    reviewScoresCleanliness?: number;
    reviewScoresCheckin?: number;
    reviewScoresCommunication?: number;
    reviewScoresLocation?: number;
    reviewScoresValue?: number;
    reviewsPerMonth?: number;
}

const Listings = sequelize.define<IListing, {}>('listings',
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
        description: {
            type: Sequelize.TEXT
        },
        neighborhoodOverview: {
            type: Sequelize.TEXT,
            field: 'neighborhood_overview'
        },
        transit: {
            type: Sequelize.TEXT
        },
        access: {
            type: Sequelize.TEXT
        },
        houseRules: {
            type: Sequelize.TEXT,
            field: 'house_rules'
        },
        pictureUrl: {
            type: Sequelize.STRING,
            field: 'picture_url'
        },
        hostId: {
            type: Sequelize.INTEGER,
            references: {
                model: Hosts,
                key: 'id'
            },
            field: 'host_id'
        },
        street: {
            type: Sequelize.STRING
        },
        neighborhoodId: {
            type: Sequelize.INTEGER,
            references: {
                model: Neighborhoods,
                key: 'id'
            },
            field: 'neighborhood_id'
        },
        latitude: {
            type: Sequelize["DOUBLE PRECISION"]
        },
        longitude: {
            type: Sequelize["DOUBLE PRECISION"]
        },
        propertyTypeId: {
            type: Sequelize.INTEGER,
            references: {
                model: PropertyTypes,
                key: 'id'
            },
            field: 'property_type_id'
        },
        roomTypeId: {
            type: Sequelize.INTEGER,
            references: {
                model: RoomTypes,
                key: 'id'
            },
            field: 'room_type_id'
        },
        accommodates: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        bathrooms: {
            type: Sequelize.DOUBLE,
            allowNull: true
        },
        bedrooms: {
            type: Sequelize.DOUBLE,
            allowNull: true
        },
        beds: {
            type: Sequelize.DOUBLE,
            allowNull: true
        },
        price: {
            type: Sequelize.DOUBLE
        },
        weeklyPrice: {
            type: Sequelize.DOUBLE,
            allowNull: true,
            field: 'weekly_price'
        },
        mountlyPrice: {
            type: Sequelize.DOUBLE,
            allowNull: true,
            field: 'mountly_price'
        },
        minimumNights: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'minimum_nights'
        },
        maximumNights: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'maximum_nights'
        },
        availability: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'availability'
        },
        numberOfReviews: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'number_of_reviews'
        },
        reviewScoresRating: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'review_scores_rating'
        },
        reviewScoresAccuracy: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'review_scores_accuracy'
        },
        reviewScoresCleanliness: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'review_scores_cleanliness'
        },
        reviewScoresCheckin: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'review_scores_checkin'
        },
        reviewScoresCommunication: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'review_scores_communication'
        },
        reviewScoresLocation: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'review_scores_location'
        },
        reviewScoresValue: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'review_scores_value'
        },
        reviewsPerMonth: {
            type: Sequelize.DOUBLE,
            allowNull: true,
            field: 'reviews_per_month'
        }
    },
    {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false
    });

export { Listings };
