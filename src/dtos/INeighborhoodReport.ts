import { IPropertyTypeReportDto } from "./IPropertyTypeReportDto";
import { IRoomTypeReportDto } from "./IRoomTypeReportDto";
import IRatingReportDto from "./IRatingReportDto";

export default interface INeighborhoodReport {
	id: number;
	name: string;
	byRoomType: IRoomTypeReportDto[];
	byPropType: IPropertyTypeReportDto[];
	byRating: IRatingReportDto[];
}
