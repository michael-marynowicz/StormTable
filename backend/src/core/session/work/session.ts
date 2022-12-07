import TableSession from "./table-session";
import UserSession from "./user-session";
import MeetingSession from "./meeting-session";

export default interface Session {
  sessionId: string;
  table: TableSession;
  users: UserSession[];
  meeting: MeetingSession;
}