import SpotModel from "../../spot.model";
import TableModel from "../../table.model";
import UserModel from "../../user.model";
import MeetingModel from "../../meeting.model";
import Session from "../work/session";

export interface TableSessionDto {
  tableId: string;
  table: TableModel;
  spots: SpotModel[];
}

export interface UserSessionDto {
  id: string;
  user: UserModel;
  location: { x: number, y: number };
}

export interface MeetingSessionDto {
  id: string;
  meeting: MeetingModel;
}

export default interface SessionDto {
  id: string;
  table: TableSessionDto;
  users: UserSessionDto[];
  meeting: MeetingSessionDto;
}

