import { Hosts } from './models/hosts';
import { Listings } from './models/listings';
import { Neighborhoods } from './models/neighborhoods'
import { Calendars } from './models/calendars';
import { RoomTypes } from './models/roomTypes';
import { PropertyTypes } from './models/propetyTypes';
import { Reviews } from './models/reviews';

Neighborhoods.hasMany(Listings, {foreignKey: 'neighborhoodId'});
Listings.belongsTo(Neighborhoods);

Hosts.hasMany(Listings, {foreignKey: 'hostId'});
Listings.belongsTo(Hosts);

Listings.hasMany(Calendars);
Calendars.belongsTo(Listings);

PropertyTypes.hasOne(Listings, {foreignKey: 'property_type_id'});
Listings.belongsTo(PropertyTypes);

RoomTypes.hasOne(Listings, {foreignKey: 'room_type_id'});
Listings.belongsTo(RoomTypes);

export const db = {
    Hosts,
    Listings,
    Neighborhoods,
    Calendars,
    RoomTypes,
    PropertyTypes,
    Reviews
}
