import { sequelize } from '../config';
import Sequelize from 'sequelize';

export interface IPropertyType {
    id: number,
    type: string
}

export const PropertyTypes = sequelize.define<IPropertyType,{}>('property_types',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: Sequelize.STRING
        },
    },
    {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false
    }
)