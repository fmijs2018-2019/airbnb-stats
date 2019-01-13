import Sequelize from 'sequelize';

export interface IRoomTypeAttributes {
    id?: number,
    type: string
}


export interface IRoomTypeInstance extends Sequelize.Instance<IRoomTypeAttributes>, IRoomTypeAttributes {
};

export const RoomTypesFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<IRoomTypeInstance, IRoomTypeAttributes> => {
    const attributes: Sequelize.DefineModelAttributes<IRoomTypeAttributes> = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    };

    const options: Sequelize.DefineOptions<IRoomTypeInstance> = {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false
    }

    const RoomTypes = sequelize.define<IRoomTypeInstance, IRoomTypeAttributes>('room_types', attributes, options);

    RoomTypes.associate = models => {
        RoomTypes.hasMany(models.Listings, { as: 'listings', foreignKey: { name: 'room_type_id', allowNull: false }, sourceKey: 'id' });
    }

    return RoomTypes;
};
