export enum DocumentType {
  PICTURE = "PICTURE"
}

export default interface DocumentModel {
  id: string;
  name: string;
  type: DocumentType;
}
