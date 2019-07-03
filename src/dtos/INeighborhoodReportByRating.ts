import IRatingReportDto from "./IRatingReportDto";

export default interface INeighborhoodReportByRating {
	id: number;
	name: string;
	reports: IRatingReportDto[];
}
