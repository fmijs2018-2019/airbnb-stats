import Sequelize from 'sequelize';

export interface ICalendarAttributes {
    id?: number;
    listingId: number;
    available: boolean;
    date: Date;
    price?: number;
}

export interface ICalendarInstance extends Sequelize.Instance<ICalendarAttributes>, ICalendarAttributes {
};

export const CalendarsFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<ICalendarInstance, ICalendarAttributes> => {
    const attributes: Sequelize.DefineModelAttributes<ICalendarAttributes> = {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        listingId: {
            type: Sequelize.INTEGER,
            field: 'listing_id',
            references: {
                model: 'listings',
                key: 'id'
            },
            allowNull: false,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        available: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        }
    };

    const options: Sequelize.DefineOptions<ICalendarInstance> = {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false
    }

    const Calendars = sequelize.define<ICalendarInstance, ICalendarAttributes>('calendars', attributes, options);

    Calendars.associate = models => {
        Calendars.belongsTo(models.Listings, { as: 'Listing', foreignKey: { name: 'listing_id', allowNull: false }, targetKey: 'id' });
    };

    return Calendars;
}