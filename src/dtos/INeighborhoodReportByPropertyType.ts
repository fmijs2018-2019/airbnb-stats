import { IPropertyTypeReportDto } from "./IPropertyTypeReportDto";
export default interface INeighborhoodReportByPropertyType {
	id: number;
	name: string;
	reports: IPropertyTypeReportDto[];
}

