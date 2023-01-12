import DocumentModel from "./document.model";

export default interface DirectoryModel extends DocumentModel{
  color: string;
  files: DocumentModel[];
}
