import { DocumentTypes } from "./document-types.enum";

export default interface DocumentModel {
  id: string;
  name: string;
  type: DocumentTypes;
  path: string;
}