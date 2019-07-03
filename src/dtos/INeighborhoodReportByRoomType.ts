import { IRoomTypeReportDto } from "./IRoomTypeReportDto";

export default interface INeighborhoodReportByRoomType {
	id: number;
	name: string;
	reports: IRoomTypeReportDto[];
}


