import UserTableSession from "./user-table-session";

export default interface TableSession {
  tableId: string;
  meetingId: string;
  users: UserTableSession[];
}