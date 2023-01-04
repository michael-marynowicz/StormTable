import SpotModel from "../../models/spot.model";
import TableModel from "../../models/table.model";
import UserModel from "../../user/user.model";
import MeetingModel from "../../models/meeting.model";
import Session from "../work/session";
import { UserService } from "../../user/user.service";
import { TableService } from "../../table/table.service";
import { MeetingService } from "../../meeting/meeting.service";

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

export function aggregateDto(
  session: Session,
  userService: UserService,
  tableService: TableService,
  meetingService: MeetingService): SessionDto {
  return {
    id: session.sessionId,
    table: {
      tableId: session.table.id,
      spots: session.table.spots,
      table: tableService.get(session.table.id)!
    },
    users: session.users.map((us) => {
      return {
        id: us.id,
        user: userService.get(us.id)!,
        location: us.location
      }
    }),
    meeting: {
      id: session.meeting.id,
      meeting: meetingService.get(session.meeting.id)!
    }
  }
}