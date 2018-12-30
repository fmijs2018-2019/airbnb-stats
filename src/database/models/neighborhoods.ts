import Sequelize from 'sequelize';

export interface INeighborhoodAttributes {
    id?: number,
    name: string,
    geojson: object,
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
        geojson: {
            type: Sequelize.JSON,
            allowNull: false,
        }
    };

    const options: Sequelize.DefineOptions<INeighborhoodInstance> = {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false
    }

    const Neighborhoods = sequelize.define<INeighborhoodInstance, INeighborhoodAttributes>('neighborhoods', attributes, options);

    Neighborhoods.associate = models => {
        Neighborhoods.hasMany(models.Listings, { as: 'Listings', foreignKey: { name: 'neighborhood_id', allowNull: false }, sourceKey: 'id' });
    }

    return Neighborhoods;
}
