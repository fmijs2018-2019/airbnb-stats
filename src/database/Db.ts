import Sequelize from 'sequelize';
import { IListingInstance, IListingAttributes, ListingsFactory } from "./models/listings";
import { IHostInstace, IHostAttributes, HostsFactory } from "./models/hosts";
import { IReviewInstance, IReviewAttributes, ReviewsFactory } from "./models/reviews";
import { IPropertyTypeInstance, PropertyTypesFactory } from "./models/propetyTypes";
import { IRoomTypeInstance, RoomTypesFactory, IRoomTypeAttributes } from "./models/roomTypes";
import { ICalendarInstance, ICalendarAttributes, CalendarsFactory } from "./models/calendars";
import { INeighborhoodInstance, INeighborhoodAttributes, NeighborhoodsFactory } from "./models/neighborhoods";

import pg from 'pg'
pg.defaults.parseInt8 = true;

const database = process.env.DBNAME as string;
const username = process.env.DBUSER as string;
const password = process.env.DBPASS as string;
const hostname = process.env.DBHOSTNAME as string;

export const sequelize = new Sequelize(database, username, password, {
	dialect: 'postgres',
	dialectOptions: {
		ssl: true
	},
	host: hostname,
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
});

export interface IDb {
	sequelize: Sequelize.Sequelize;
	Sequelize: Sequelize.SequelizeStatic;
	Listings: Sequelize.Model<IListingInstance, IListingAttributes>;
	Calendars: Sequelize.Model<ICalendarInstance, ICalendarAttributes>;
	Neighborhoods: Sequelize.Model<INeighborhoodInstance, INeighborhoodAttributes>;
	Hosts: Sequelize.Model<IHostInstace, IHostAttributes>;
	Reviews: Sequelize.Model<IReviewInstance, IReviewAttributes>;
	PropertyTypes: Sequelize.Model<IPropertyTypeInstance, IPropertyTypeInstance>;
	RoomTypes: Sequelize.Model<IRoomTypeInstance, IRoomTypeAttributes>;
}

const db: IDb = {
	sequelize,
	Sequelize,
	Listings: ListingsFactory(sequelize, Sequelize),
	Hosts: HostsFactory(sequelize, Sequelize),
	Reviews: ReviewsFactory(sequelize, Sequelize),
	Calendars: CalendarsFactory(sequelize, Sequelize),
	RoomTypes: RoomTypesFactory(sequelize, Sequelize),
	PropertyTypes: PropertyTypesFactory(sequelize, Sequelize),
	Neighborhoods: NeighborhoodsFactory(sequelize, Sequelize),
};

export const syncDatabase = async function (db: IDb) {
	const getListingsFunction =
		`CREATE OR REPLACE FUNCTION public.get_listings(
            skip integer,
            take integer,
            from_date date DEFAULT NULL,
            to_date date DEFAULT NULL,
			from_price double precision DEFAULT NULL,
			to_price double precision DEFAULT NULL,
            n_ids integer[] DEFAULT NULL,
            pt_ids integer[] DEFAULT NULL,
            rt_ids integer[] DEFAULT NULL,
            order_by integer DEFAULT 0)
            RETURNS TABLE(
                id integer, 
                name character varying, 
                street character varying, 
                neighborhood_overview text, 
                price double precision, 
                neighborhood character varying, 
                propertyType character varying, 
                roomType character varying,
                accommodates integer,
                rating integer,
                t_count bigint)
        AS $$
            BEGIN
                RAISE NOTICE 'Calling get_listings(%, %, %, %, %, %, %, %, %, %)', skip, take, from_date, to_date, from_price, to_price, n_ids, pt_ids, rt_ids, order_by;
                RETURN QUERY
                    WITH nh AS (SELECT * 
                                FROM neighborhoods AS n 
                                WHERE n_ids IS NULL OR n.id = ANY (n_ids)),
                        rt AS (SELECT * 
                                FROM room_types AS r_types 
                                WHERE rt_ids IS NULL OR r_types.id = ANY (rt_ids)),
                        pt AS (SELECT * 
                                FROM property_types AS p_types
                                WHERE pt_ids IS NULL OR p_types.id = ANY (pt_ids)),
                        available AS (SELECT listing_id
                                FROM calendars
                                WHERE date BETWEEN from_date AND to_date
                                GROUP BY listing_id
                                HAVING COUNT(*) FILTER (WHERE available = false) = 0)
                    SELECT l.id, l.name, l.street, l.neighborhood_overview, l.price, nh.name AS neighborhood, pt.type AS property_type, rt.type AS room_type, l.accommodates, l.review_scores_rating as rating, COUNT(*) OVER() AS t_count
                    FROM listings AS l
                    INNER JOIN nh
                    ON l.neighborhood_id = nh.id
                    INNER JOIN pt
                    ON l.property_type_id = pt.id
                    INNER JOIN rt
                    ON l.room_type_id = rt.id
                    LEFT JOIN available as ua
                    ON l.id = ua.listing_id
                    WHERE ((from_date IS NULL AND to_date IS NULL) OR ua.listing_id IS NOT NULL) AND
							(from_price IS NULL OR l.price >= from_price) AND
							(to_price IS NULL OR l.price <= to_price)
                    ORDER BY 
                        CASE order_by
                        WHEN 1 THEN l.price
                        WHEN 2 THEN l.accommodates
                        WHEN 3 THEN l.review_scores_rating
                        END DESC NULLS LAST,
                        CASE order_by
                        WHEN 4 THEN l.price
                        WHEN 5 THEN l.accommodates
                        WHEN 6 THEN l.review_scores_rating
                        ELSE l.id
                        END ASC NULLS LAST
                    OFFSET skip
                    LIMIT take;
            END
        $$ LANGUAGE plpgsql;`;

	await db.sequelize.sync();
	await db.sequelize.query(getListingsFunction);
}

Object.keys(db).forEach(modelName => {
	if ((db as any)[modelName].associate) {
		(db as any)[modelName].associate(db);
	}
});

export default db;