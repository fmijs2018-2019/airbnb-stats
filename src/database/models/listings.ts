import { sequelize } from '../config';
import Sequelize from 'sequelize';
import { strictEqual } from 'assert';
import { Hosts } from './hosts';
import { Neighborhoods } from './neighborhoods';

const propertyTypes = ['Apartment', 'Bed and breakfast', 'Houseboat', 'Boat',
    'Townhouse', 'Guest suite', 'Loft', 'Serviced apartment', 'Other', 'Boutique hotel',
    'Condominium', 'House', 'Windmill', 'Camper/RV', 'Villa', 'Chalet', 'Nature lodge',
    'Tiny house', 'Hotel', 'Cabin', 'Guesthouse', 'Lighthouse', 'Yurt', 'Bungalow',
    'Hostel', 'Cottage', 'Tent', 'Earth house', 'Campsite', 'Bus', 'Castle', 'Barn',
    'Aparthotel', 'Casa particular (Cuba)', 'Casa particular'];

const Listings = sequelize.define('listings',
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
            type: Sequelize.DECIMAL
        },
        longitude: {
            type: Sequelize.DECIMAL
        },
        propertyType: {
            type: Sequelize.ENUM,
            values: propertyTypes,
            field: 'property_type'
        },
        roomType: {
            type: Sequelize.ENUM,
            values: ['Private room', 'Entire home/apt', 'Shared room'],
            field: 'room_type'
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
