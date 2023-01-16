import DocumentModel from "./document.model";


export default interface MeetingModel {
  id: string;
  name: string;

  documents: DocumentModel[];
}