export interface INeighborhoodReports {
    ng_id: number,
    ng_name: string,
    byPropertyType: IReportsData[],
    byRoomType: IReportsData[]
}

export interface IReportsData {
    id: number,
    name: string,
    count: number
}