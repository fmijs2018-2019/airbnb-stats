import db from "../database/Db";
import _ from 'lodash';
import Bluebird from 'bluebird';
import INeighborhoodReportByRoomType from "../dtos/INeighborhoodReportByPropertyType";
import INeighborhoodReportByPropertyType from "../dtos/INeighborhoodReportByPropertyType";
import INeighborhoodReportByRating from "../dtos/INeighborhoodReportByRating";
import INeighborhoodReport from "../dtos/INeighborhoodReport";
import INeighborhoodSimpleDto from "../dtos/INeighborhoodSimpleDto";
import INeghborhoodReportByAllTypesOfRatingDto from "../dtos/INeighborhoodReportByAllTypesOfRatingDto";
import { IAvailabilityReportDto } from "../dtos/IAvailabilityReportDto";
import INeighborhoodAvailabilityReport from "../dtos/INeighborhoodAvailabilityReport";
import INeighborhoodPriceReport from "../dtos/INeighborhoodPriceReport";
import sequelize = require("sequelize");

export const neighborhoodService = {
	getNeighborhoodsSimpleDto: function (): Bluebird<INeighborhoodSimpleDto[]> {
		return db.Neighborhoods.findAll({
			attributes: ['id', 'name'],
			raw: true
		}).then(result => {
			return result.map(v => {
				const dto: INeighborhoodSimpleDto = {
					id: v.id || 0,
					name: v.name
				};
				return dto;
			});
		});
	},

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

	getAccuracyRatingReportsById: function (neighborhoodId: number): Bluebird<INeighborhoodReportByRating | null> {
		var promise = db.Listings.findAll({
			attributes: ['listings.neighborhood_id', 'neighborhood.name', ['review_scores_accuracy', 'rating'], [db.sequelize.fn('COUNT', 'listings.id'), 'count']],
			include: [
				{ model: db.Neighborhoods, as: 'neighborhood', attributes: [] }
			],
			where: { 'neighborhoodId': neighborhoodId },
			group: ['listings.neighborhood_id', 'neighborhood.name', 'review_scores_accuracy'],
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

	getCleanlinessRatingReportsById: function (neighborhoodId: number): Bluebird<INeighborhoodReportByRating | null> {
		var promise = db.Listings.findAll({
			attributes: ['listings.neighborhood_id', 'neighborhood.name', ['review_scores_cleanliness', 'rating'], [db.sequelize.fn('COUNT', 'listings.id'), 'count']],
			include: [
				{ model: db.Neighborhoods, as: 'neighborhood', attributes: [] }
			],
			where: { 'neighborhoodId': neighborhoodId },
			group: ['listings.neighborhood_id', 'neighborhood.name', 'review_scores_cleanliness'],
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

	getCheckinRatingReportsById: function (neighborhoodId: number): Bluebird<INeighborhoodReportByRating | null> {
		var promise = db.Listings.findAll({
			attributes: ['listings.neighborhood_id', 'neighborhood.name', ['review_scores_checkin', 'rating'], [db.sequelize.fn('COUNT', 'listings.id'), 'count']],
			include: [
				{ model: db.Neighborhoods, as: 'neighborhood', attributes: [] }
			],
			where: { 'neighborhoodId': neighborhoodId },
			group: ['listings.neighborhood_id', 'neighborhood.name', 'review_scores_checkin'],
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

	getCommunicationRatingReportsById: function (neighborhoodId: number): Bluebird<INeighborhoodReportByRating | null> {
		var promise = db.Listings.findAll({
			attributes: ['listings.neighborhood_id', 'neighborhood.name', ['review_scores_communication', 'rating'], [db.sequelize.fn('COUNT', 'listings.id'), 'count']],
			include: [
				{ model: db.Neighborhoods, as: 'neighborhood', attributes: [] }
			],
			where: { 'neighborhoodId': neighborhoodId },
			group: ['listings.neighborhood_id', 'neighborhood.name', 'review_scores_communication'],
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

	getLocationRatingReportsById: function (neighborhoodId: number): Bluebird<INeighborhoodReportByRating | null> {
		var promise = db.Listings.findAll({
			attributes: ['listings.neighborhood_id', 'neighborhood.name', ['review_scores_location', 'rating'], [db.sequelize.fn('COUNT', 'listings.id'), 'count']],
			include: [
				{ model: db.Neighborhoods, as: 'neighborhood', attributes: [] }
			],
			where: { 'neighborhoodId': neighborhoodId },
			group: ['listings.neighborhood_id', 'neighborhood.name', 'review_scores_location'],
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

	getValueRatingReportsById: function (neighborhoodId: number): Bluebird<INeighborhoodReportByRating | null> {
		var promise = db.Listings.findAll({
			attributes: ['listings.neighborhood_id', 'neighborhood.name', ['review_scores_value', 'rating'], [db.sequelize.fn('COUNT', 'listings.id'), 'count']],
			include: [
				{ model: db.Neighborhoods, as: 'neighborhood', attributes: [] }
			],
			where: { 'neighborhoodId': neighborhoodId },
			group: ['listings.neighborhood_id', 'neighborhood.name', 'review_scores_value'],
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

	getPriceReportsById: function (neighborhoodId: number): Bluebird<INeighborhoodPriceReport | null> {
		var daily = db.Listings.findAll({
			attributes: [
				'neighborhood.id',
				'neighborhood.name',
				[db.sequelize.fn('AVG', db.sequelize.col('price')), 'avgDailyPrice'],
			],
			include: [
				{ model: db.Neighborhoods, as: 'neighborhood', attributes: [] }
			],
			where: { 'neighborhoodId': neighborhoodId, 'price': { [sequelize.Op.ne]: null } },
			group: ['neighborhood.id', 'neighborhood.name'],
			raw: true
		});

		var weekly = db.Listings.findAll({
			attributes: [
				'neighborhood.id',
				'neighborhood.name',
				[db.sequelize.fn('AVG', db.sequelize.col('weekly_price')), 'avgWeeklyPrice']
			],
			include: [
				{ model: db.Neighborhoods, as: 'neighborhood', attributes: [] }
			],
			where: { 'neighborhoodId': neighborhoodId, 'weeklyPrice': { [sequelize.Op.ne]: null } },
			group: ['neighborhood.id', 'neighborhood.name'],
			raw: true
		});

		var monthly = db.Listings.findAll({
			attributes: [
				'neighborhood.id',
				'neighborhood.name',
				[db.sequelize.fn('AVG',  db.sequelize.col('mountly_price')), 'avgMonthlyPrice'],
			],
			include: [
				{ model: db.Neighborhoods, as: 'neighborhood', attributes: [] }
			],
			where: { 'neighborhoodId': neighborhoodId, 'mountlyPrice': { [sequelize.Op.ne]: null } },
			group: ['neighborhood.id', 'neighborhood.name'],
			raw: true
		});

		return Bluebird.all([daily, weekly, monthly]).then(([r1, r2, r3]: any[]) => {
			if (r1 || r2 || r3) {
				const ngReport: INeighborhoodPriceReport = {
					id: r1 ? r1[0].id : 0,
					name: r1 ? r1[0].name : '',
					avgDailyPrice: r1[0].avgDailyPrice || 0, 
					avgWeaklyPrice: r2[0].avgWeeklyPrice || 0,
					avgMonthlyPrice: r3[0].avgMonthlyPrice || 0,
				};
				return ngReport;
			} else {
				return null;
			}
		});
	},

	getAllTypesOfRatingReportsById: function (neighborhoodId: number): Bluebird<INeghborhoodReportByAllTypesOfRatingDto | null> {
		const cleanliness = this.getCleanlinessRatingReportsById(neighborhoodId);
		const value = this.getValueRatingReportsById(neighborhoodId);
		const location = this.getLocationRatingReportsById(neighborhoodId);
		const accuracy = this.getAccuracyRatingReportsById(neighborhoodId);
		const checkin = this.getCheckinRatingReportsById(neighborhoodId);
		const communication = this.getCommunicationRatingReportsById(neighborhoodId);
		const rating = this.getRatingReportsById(neighborhoodId);

		return Bluebird.all([cleanliness, value, location, accuracy, checkin, communication, rating]).then(([r1, r2, r3, r4, r5, r6, r7]) => {
			if (!r1 && !r2 && !r3 && !r4 && !r5 && !r6 && !r7) {
				return null;
			} else {
				const ngReport: INeghborhoodReportByAllTypesOfRatingDto = {
					id: r1 ? r1.id : 0,
					name: r1 ? r1.name : '',
					cleanliness: r1 ? r1.reports : [],
					value: r2 ? r2.reports : [],
					location: r3 ? r3.reports : [],
					accuracy: r4 ? r4.reports : [],
					checkin: r5 ? r5.reports : [],
					communication: r6 ? r6.reports : [],
					totalRating: r7 ? r7.reports : [],
				}
				return ngReport;
			}
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

	getAvailabilityReportsById: function (neighborhoodId: number): Bluebird<INeighborhoodAvailabilityReport | null> {
		var promise = db.Listings.findAll({
			attributes: ['listings.neighborhood_id', 'neighborhood.name', 'availability', [db.sequelize.fn('COUNT', 'listings.id'), 'count']],
			include: [
				{ model: db.Neighborhoods, as: 'neighborhood', attributes: [] }
			],
			where: { 'neighborhoodId': neighborhoodId },
			group: ['listings.neighborhood_id', 'neighborhood.name', 'availability'],
			raw: true
		});

		return promise.then((availability: any) => {
			if (availability && availability.length > 0) {
				const ngReport: INeighborhoodAvailabilityReport = {
					id: availability[0].neighborhood_id,
					name: availability[0].name,
					availability: availability.map((r: any) => {
						return {
							days: r.availability,
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


