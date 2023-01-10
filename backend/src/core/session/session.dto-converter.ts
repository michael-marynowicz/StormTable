import Session from "../models/session/work/session";
import SessionDto from "../models/session/dto/session.dto";
import { UserService } from "../user/user.service";
import { TableService } from "../table/table.service";
import { MeetingService } from "../meeting/meeting.service";

export function aggregateDto(
  session: Session,
  userService: UserService,
  tableService: TableService,
  meetingService: MeetingService): SessionDto {
  const meeting = meetingService.get(session.meeting.id)!;
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
      meeting: meeting
    }
  }
}