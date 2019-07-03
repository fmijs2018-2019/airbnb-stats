import db from "../database/Db";
import _ from 'lodash';
import Bluebird from 'bluebird';
import INeighborhoodReportByRoomType from "../dtos/INeighborhoodReportByPropertyType";
import INeighborhoodReportByPropertyType from "../dtos/INeighborhoodReportByPropertyType";
import INeighborhoodReportByRating from "../dtos/INeighborhoodReportByRating";
import INeighborhoodReport from "../dtos/INeighborhoodReport";

export const neighborhoodService = {
	getAllRoomTypeReports: function (): Bluebird<INeighborhoodReportByRoomType[]> {
		var promise = db.Listings.findAll({
			attributes: ['listings.neighborhood_id', 'neighborhood.name', 'roomType.type', 'listings.room_type_id', [db.sequelize.fn('COUNT', 'listings.id'), 'count']],
			include: [
				{ model: db.RoomTypes, as: 'roomType', attributes: [] },
				{ model: db.Neighborhoods, as: 'neighborhood', attributes: [] }
			],
			group: ['listings.neighborhood_id', 'neighborhood.name', 'roomType.type', 'listings.room_type_id'],
			raw: true
		});

		return promise.then((byRoomType: any) => {
			let dict: _.Dictionary<INeighborhoodReportByRoomType> = {};

			byRoomType.forEach((r: any) => {
				if (!dict[r.neighborhood_id.toString()]) {
					dict[r.neighborhood_id] = {
						id: r.neighborhood_id,
						name: r.name,
						reports: []
					}
				}

				dict[r.neighborhood_id.toString()].reports.push({
					id: r.room_type_id,
					type: r.type,
					count: r.count,
				});
			});

			return Object.keys(dict).map(k => dict[k]);
		});
	},

	getRoomTypeReportsById: function (neighborhoodId: number): Bluebird<INeighborhoodReportByRoomType | null> {
		var promise = db.Listings.findAll({
			attributes: ['listings.neighborhood_id', 'neighborhood.name', 'roomType.type', 'listings.room_type_id', [db.sequelize.fn('COUNT', 'listings.id'), 'count']],
			include: [
				{ model: db.RoomTypes, as: 'roomType', attributes: [] },
				{ model: db.Neighborhoods, as: 'neighborhood', attributes: [] }
			],
			where: { 'neighborhoodId': neighborhoodId },
			group: ['listings.neighborhood_id', 'neighborhood.name', 'roomType.type', 'listings.room_type_id'],
			raw: true
		});

		return promise.then((byRoomType: any) => {
			if (byRoomType && byRoomType.length > 0) {
				const ngReport = {
					id: byRoomType[0].neighborhood_id,
					name: byRoomType[0].name,
					reports: byRoomType.map((r: any) => {
						return {
							id: r.room_type_id,
							type: r.type,
							count: r.count,
						};
					})
				};
				return ngReport;
			} else {
				return null;
			}
		});
	},

	getAllPropertyTypeReports: function (): Bluebird<INeighborhoodReportByPropertyType[]> {
		var promise = db.Listings.findAll({
			attributes: ['listings.neighborhood_id', 'neighborhood.name', 'propertyType.type', 'listings.property_type_id', [db.sequelize.fn('COUNT', 'listings.id'), 'count']],
			include: [
				{ model: db.PropertyTypes, as: 'propertyType', attributes: [] },
				{ model: db.Neighborhoods, as: 'neighborhood', attributes: [] }
			],
			group: ['listings.neighborhood_id', 'neighborhood.name', 'propertyType.type', 'listings.property_type_id'],
			raw: true
		});

		return promise.then((byPropertyType: any) => {
			let dict: _.Dictionary<INeighborhoodReportByPropertyType> = {};

			byPropertyType.forEach((r: any) => {
				if (!dict[r.neighborhood_id.toString()]) {
					dict[r.neighborhood_id] = {
						id: r.neighborhood_id,
						name: r.name,
						reports: []
					}
				}

				dict[r.neighborhood_id.toString()].reports.push({
					id: r.property_type_id,
					type: r.type,
					count: r.count,
				});
			});

			return Object.keys(dict).map(k => dict[k]);
		});
	},

	getPropertyTypeReportsById: function (neighborhoodId: number): Bluebird<INeighborhoodReportByPropertyType | null> {
		var promise = db.Listings.findAll({
			attributes: ['listings.neighborhood_id', 'neighborhood.name', 'propertyType.type', 'listings.property_type_id', [db.sequelize.fn('COUNT', 'listings.id'), 'count']],
			include: [
				{ model: db.PropertyTypes, as: 'propertyType', attributes: [] },
				{ model: db.Neighborhoods, as: 'neighborhood', attributes: [] }
			],
			where: { 'neighborhoodId': neighborhoodId },
			group: ['listings.neighborhood_id', 'neighborhood.name', 'propertyType.type', 'listings.property_type_id'],
			raw: true
		});

		return promise.then((byPropType: any) => {
			if (byPropType && byPropType.length > 0) {
				const ngReport: INeighborhoodReportByPropertyType = {
					id: byPropType[0].neighborhood_id,
					name: byPropType[0].name,
					reports: byPropType.map((r: any) => {
						return {
							id: r.property_type_id,
							type: r.type,
							count: r.count,
						};
					})
				};
				return ngReport;
			} else {
				return null;
			}
		});
	},

	getAllRatingReports: function (): Bluebird<INeighborhoodReportByRating[]> {
		var promise = db.Listings.findAll({
			attributes: ['listings.neighborhood_id', 'neighborhood.name', ['review_scores_rating', 'rating'], [db.sequelize.fn('COUNT', 'listings.id'), 'count']],
			include: [
				{ model: db.Neighborhoods, as: 'neighborhood', attributes: [] }
			],
			group: ['listings.neighborhood_id', 'neighborhood.name', 'review_scores_rating'],
			raw: true
		});

		return promise.then((byRating: any) => {
			let dict: _.Dictionary<INeighborhoodReportByRating> = {};

			byRating.forEach((r: any) => {
				if (!dict[r.neighborhood_id.toString()]) {
					dict[r.neighborhood_id] = {
						id: r.neighborhood_id,
						name: r.name,
						reports: []
					}
				}

				dict[r.neighborhood_id.toString()].reports.push({
					rating: r.rating,
					count: r.count,
				});
			});

			return Object.keys(dict).map(k => dict[k]);
		});
	},

	getRatingReportsById: function (neighborhoodId: number): Bluebird<INeighborhoodReportByRating | null> {
		var promise = db.Listings.findAll({
			attributes: ['listings.neighborhood_id', 'neighborhood.name', ['review_scores_rating', 'rating'], [db.sequelize.fn('COUNT', 'listings.id'), 'count']],
			include: [
				{ model: db.Neighborhoods, as: 'neighborhood', attributes: [] }
			],
			where: { 'neighborhoodId': neighborhoodId },
			group: ['listings.neighborhood_id', 'neighborhood.name', 'review_scores_rating'],
			raw: true
		});

		return promise.then((byPropType: any) => {
			if (byPropType && byPropType.length > 0) {
				const ngReport: INeighborhoodReportByRating = {
					id: byPropType[0].neighborhood_id,
					name: byPropType[0].name,
					reports: byPropType.map((r: any) => {
						return {
							rating: r.rating,
							count: r.count,
						};
					})
				};
				return ngReport;
			} else {
				return null;
			}
		});
	},

	getAllRepots: function (): Bluebird<INeighborhoodReport[]> {
		var byRoomTypePromise = this.getAllRoomTypeReports();
		var byPropertyTypePromise = this.getAllPropertyTypeReports();
		var byRatingPromise = this.getAllRatingReports();

		return Bluebird.all([byRoomTypePromise, byPropertyTypePromise, byRatingPromise])
			.then(([byRoomType, byPropertyType, byRating]) => {
				let dict: _.Dictionary<INeighborhoodReport> = {};

				byRoomType.forEach(r => {
					dict[r.id.toString()] = {
						id: r.id,
						name: r.name,
						byRoomType: r.reports,
						byPropType: [],
						byRating: [],
					};
				});

				byPropertyType.forEach(r => {
					dict[r.id.toString()].byPropType = r.reports;
				});

				byRating.forEach(r => {
					dict[r.id.toString()].byRating = r.reports;
				});

				return Object.keys(dict).map(k => dict[k]);
			});
	},

	getRepotsById: function (neighborhoodId: number): Bluebird<INeighborhoodReport | null> {
		var byRoomTypePromise = this.getRoomTypeReportsById(neighborhoodId);
		var byPropertyTypePromise = this.getPropertyTypeReportsById(neighborhoodId);
		var byRatingPromise = this.getRatingReportsById(neighborhoodId);

		return Bluebird.all([byRoomTypePromise, byPropertyTypePromise, byRatingPromise])
			.then(([byRoomType, byPropertyType, byRating]) => {
				if (byRoomType === null && byPropertyType === null && byRating === null) {
					return null
				} else {
					let room = byRoomType as INeighborhoodReportByRoomType;
					let prop = byPropertyType as INeighborhoodReportByPropertyType;
					let rating = byRating as INeighborhoodReportByRating;
					
					const reports: INeighborhoodReport = {
						id: room.id,
						name: room.name,
						byRoomType: room.reports,
						byPropType: prop.reports,
						byRating: rating.reports
					};
					return reports;
				}
			});
	}
}


