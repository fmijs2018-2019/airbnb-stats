import Sequelize from 'sequelize';

export interface IReviewAttributes {
    id?: number;
    listingId: number;
    date: Date;
}

export interface IReviewInstance extends Sequelize.Instance<IReviewAttributes>, IReviewAttributes {
};

export const ReviewsFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<IReviewInstance, IReviewAttributes> => {
    const attributes: Sequelize.DefineModelAttributes<IReviewAttributes> = {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        listingId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'listings',
                key: 'id'
            },
            field: 'listing_id',
            allowNull: false,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
    };

    const options: Sequelize.DefineOptions<IReviewInstance> = {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false
    }

    const Reviews = sequelize.define<IReviewInstance, IReviewAttributes>('reviews', attributes, options);

    Reviews.associate = models => {
        Reviews.belongsTo(models.Listings, { as: 'Listing', foreignKey: { name: 'listing_id', allowNull: false }, targetKey: 'id' });
    }

    return Reviews;
};
