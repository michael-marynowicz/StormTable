export enum DocumentTypes {
  PICTURE = "PICTURE"
}
export default interface DocumentModel {
  id: string;
  name: string;
  type: DocumentTypes;
  path: string;
}
