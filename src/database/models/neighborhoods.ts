import Sequelize from 'sequelize';
import { IListingAttributes } from './listings';

export interface INeighborhoodAttributes {
    id?: number,
    name: string,
    geoJson: object,
    centerLongitude: number,
    centerLatitude: number,
    zoom: number
};

export interface INeighborhoodInstance extends Sequelize.Instance<INeighborhoodAttributes>, INeighborhoodAttributes {
};

export const NeighborhoodsFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<INeighborhoodInstance, INeighborhoodAttributes> => {
    const attributes: Sequelize.DefineModelAttributes<INeighborhoodAttributes> = {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        geoJson: {
            type: Sequelize.JSON,
            field: 'geo_json',
            allowNull: false,
        },
        centerLongitude: {
            type: Sequelize["DOUBLE PRECISION"],
            allowNull: false,
            field: 'center_longitude'
        },
        centerLatitude: {
            type: Sequelize["DOUBLE PRECISION"],
            allowNull: false,
            field: 'center_latitude'
        },
        zoom: {
            type: Sequelize.FLOAT,
            allowNull: false,
        }
    };

    const options: Sequelize.DefineOptions<INeighborhoodInstance> = {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false
    }

    const Neighborhoods = sequelize.define<INeighborhoodInstance, INeighborhoodAttributes>('neighborhoods', attributes, options);

    Neighborhoods.associate = models => {
        Neighborhoods.hasMany(models.Listings, { as: 'listings', foreignKey: { name: 'neighborhood_id', allowNull: false }, sourceKey: 'id' });
    }

    return Neighborhoods;
}
