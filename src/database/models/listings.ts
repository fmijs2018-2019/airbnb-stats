import Sequelize from 'sequelize';

export interface IListingAttributes {
    id?: number;
    url: string;
    name?: string;
    description?: string;
    neighborhoodOverview?: string;
    transit?: string;
    access?: string;
    houseRules?: string;
    pictureUrl?: string;
    hostId: number;
    street: string;
    neighborhoodId: number;
    latitude: number;
    longitude: number;
    propertyTypeId: number;
    roomTypeId: number,
    accommodates: number;
    bathrooms?: number;
    bedrooms?: number;
    beds?: number;
    price: number;
    weeklyPrice?: number;
    mountlyPrice?: number;
    minimumNights: number;
    maximumNights: number;
    availability: number;
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

export interface IListingInstance extends Sequelize.Instance<IListingAttributes>, IListingAttributes {

}

export const ListingsFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<IListingInstance, IListingAttributes> => {
    const attributes: Sequelize.DefineModelAttributes<IListingAttributes> = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        neighborhoodOverview: {
            type: DataTypes.TEXT,
            field: 'neighborhood_overview',
            allowNull: true,
        },
        transit: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        access: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        houseRules: {
            type: DataTypes.TEXT,
            field: 'house_rules',
            allowNull: true,
        },
        pictureUrl: {
            type: DataTypes.STRING,
            field: 'picture_url',
            allowNull: true,
        },
        hostId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'hosts',
                key: 'id'
            },
            field: 'host_id',
            allowNull: false,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        neighborhoodId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'heighborhood',
                key: 'id'
            },
            field: 'neighborhood_id',
            allowNull: false,
        },
        latitude: {
            type: DataTypes["DOUBLE PRECISION"],
            allowNull: false,
        },
        longitude: {
            type: DataTypes["DOUBLE PRECISION"],
            allowNull: false,
        },
        propertyTypeId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'property_type',
                key: 'id'
            },
            field: 'property_type_id',
            allowNull: false,
        },
        roomTypeId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'room_type',
                key: 'id'
            },
            field: 'room_type_id',
            allowNull: false,
        },
        accommodates: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bathrooms: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        bedrooms: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        beds: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        weeklyPrice: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            field: 'weekly_price'
        },
        mountlyPrice: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            field: 'mountly_price'
        },
        minimumNights: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'minimum_nights'
        },
        maximumNights: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'maximum_nights'
        },
        availability: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'availability'
        },
        numberOfReviews: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'number_of_reviews'
        },
        reviewScoresRating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'review_scores_rating'
        },
        reviewScoresAccuracy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'review_scores_accuracy'
        },
        reviewScoresCleanliness: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'review_scores_cleanliness'
        },
        reviewScoresCheckin: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'review_scores_checkin'
        },
        reviewScoresCommunication: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'review_scores_communication'
        },
        reviewScoresLocation: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'review_scores_location'
        },
        reviewScoresValue: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'review_scores_value'
        },
        reviewsPerMonth: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            field: 'reviews_per_month'
        }
    };

    const options: Sequelize.DefineOptions<IListingInstance> = {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false
    }

    const Listings = sequelize.define<IListingInstance, IListingAttributes>('listings', attributes, options);

    Listings.associate = models => {
        Listings.hasMany(models.Calendars, { as: 'calendars', foreignKey: { name: 'listing_id', allowNull: false }, sourceKey: 'id' });
        Listings.belongsTo(models.Neighborhoods, { as: 'neighborhood', foreignKey: { name: 'neighborhood_id', allowNull: false }, targetKey: 'id' });
        Listings.belongsTo(models.PropertyTypes, { as: 'propertyType', foreignKey: { name: 'property_type_id', allowNull: false }, targetKey: 'id' });
        Listings.belongsTo(models.Hosts, { as: 'host', foreignKey: { name: 'host_id', allowNull: false }, targetKey: 'id' });
        Listings.belongsTo(models.RoomTypes, { as: 'roomType', foreignKey: { name: 'room_type_id', allowNull: false }, targetKey: 'id' });
    }

    return Listings;
};
