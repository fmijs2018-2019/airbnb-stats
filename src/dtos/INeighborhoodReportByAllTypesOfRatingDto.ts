import IRatingReportDto from "./IRatingReportDto";

export default interface INeghborhoodReportByAllTypesOfRatingDto {
	id: number;
	name: string;
	cleanliness: IRatingReportDto[];
	location: IRatingReportDto[];
	accuracy: IRatingReportDto[];
	value: IRatingReportDto[];
	communication: IRatingReportDto[];
	checkin: IRatingReportDto[];
	totalRating: IRatingReportDto[];
}
