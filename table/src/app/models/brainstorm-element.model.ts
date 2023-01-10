import ViewportModel from "./viewport.model";

export enum ElementType {
  PICTURE = "PICTURE",
  PDF = "PDF",
  WORD = "WORD",
  PPTX = "PPTX",
  TXT = "TXT",
  DOC="DOC"
}

export default interface BrainstormElementModel {
  id: string;
  type: ElementType;
  viewport: ViewportModel;
  url: string;


}

