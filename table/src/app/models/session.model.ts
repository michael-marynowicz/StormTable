export interface TableSessionModel {
  id: string;
}

export interface UserSessionModel {
  id: string;
  location: { x: number, y: number }
}

export interface MeetingSessionModel {
  id: string;
}

export default interface SessionModel {
  sessionId: number;
  table: TableSessionModel,
  users: UserSessionModel[],
  meeting: MeetingSessionModel
}
