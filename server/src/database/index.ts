import { Hosts } from './models/hosts';
import { Listings } from './models/listings';
import { Neighborhoods } from './models/neighborhoods'
import { Calendars } from './models/calendars';

Listings.hasOne(Hosts, { foreignKey: 'host_id', });
Hosts.hasMany(Listings);

Listings.hasOne(Neighborhoods, { foreignKey: 'neighborhood_id' });
Neighborhoods.hasMany(Listings);

Calendars.hasOne(Listings, { foreignKey: 'listing_id' });
Listings.hasMany(Calendars);

export const db = {
    Hosts,
    Listings,
    Neighborhoods,
    Calendars,
}
