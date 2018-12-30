import Sequelize from 'sequelize';

export interface IHostAttributes {
    id?: number,
    url: string,
    name?: string,
    location?: string,
    about?: string,
    pictureUrl?: string,
    listingsCount?: number
}

export interface IHostInstace extends Sequelize.Instance<IHostAttributes>, IHostAttributes {
};

export const HostsFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<IHostInstace, IHostAttributes> => {
    const attributes: Sequelize.DefineModelAttributes<IHostAttributes> = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        about: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        pictureUrl: {
            type: DataTypes.STRING,
            field: 'picture_url',
            allowNull: true,
        },
        listingsCount: {
            type: DataTypes.INTEGER,
            field: 'listings_count',
            allowNull: true,
        }
    };

    const options: Sequelize.DefineOptions<IHostInstace> = {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false
    };

    const Hosts = sequelize.define<IHostInstace, IHostAttributes>('hosts', attributes, options);

    Hosts.associate = models => {
        Hosts.hasMany(models.Listings, { as: 'Listings', foreignKey: { name: 'host_id', allowNull: false }, sourceKey: 'id' });
    }

    return Hosts;
};
