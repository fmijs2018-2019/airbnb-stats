import Sequelize from 'sequelize';

export interface IPropertyTypeAttributes {
    id?: number,
    type: string
}

export interface IPropertyTypeInstance extends Sequelize.Instance<IPropertyTypeAttributes>, IPropertyTypeAttributes {
};

export const PropertyTypesFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<IPropertyTypeInstance, IPropertyTypeAttributes> => {
    const attributes: Sequelize.DefineModelAttributes<IPropertyTypeAttributes> = {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    };

    const options: Sequelize.DefineOptions<IPropertyTypeInstance> = {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false
    };

    const PropertyTypes = sequelize.define<IPropertyTypeInstance, IPropertyTypeAttributes>('property_types', attributes, options);

    PropertyTypes.associate = models => {
        PropertyTypes.hasMany(models.Listings, { as: 'Listings', foreignKey: { name: 'property_type_id', allowNull: false }, sourceKey: 'id' });
    }

    return PropertyTypes;
}
