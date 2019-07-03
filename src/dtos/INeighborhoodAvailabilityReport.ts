import { IAvailabilityReportDto } from "./IAvailabilityReportDto";

export default interface INeighborhoodAvailabilityReport {
	id: number;
	name: string;
	availability: IAvailabilityReportDto[];
}


