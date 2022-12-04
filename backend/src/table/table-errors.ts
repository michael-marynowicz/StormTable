export enum TableErrorTypes {
  TABLE_NOT_FOUND = "TABLE_NOT_FOUND",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  MEETING_NOT_FOUND = "MEETING_NOT_FOUND",
  DOCUMENT_NOT_FOUND = "DOCUMENT_NOT_FOUND",
  SESSION_NOT_FOUND = "SESSION_NOT_FOUND"
}
export default class TableErrors {
  constructor(public type: TableErrorTypes, public message: string) {
  }
}