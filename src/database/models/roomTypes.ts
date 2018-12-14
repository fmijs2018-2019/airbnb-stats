import { sequelize } from '../config';
import Sequelize from 'sequelize';

export interface IRoomType {
    id: number,
    type: string
}

export const RoomTypes = sequelize.define<IRoomType, {}>('room_types',
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