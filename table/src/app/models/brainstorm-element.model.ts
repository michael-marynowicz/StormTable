import ViewportModel from "./viewport.model";

export enum BrainstormElementType {
  PICTURE = "PICTURE",
  PDF = "PDF",
  WORD = "WORD",
  PPTX = "PPTX",
  TXT="TXT"
}

export default interface BrainstormElementModel {
  id: string;
  type: BrainstormElementType;
  viewport: ViewportModel;
  url: string;


}

