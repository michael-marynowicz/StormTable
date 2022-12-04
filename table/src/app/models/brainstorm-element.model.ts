import ViewportModel from "./viewport.model";

export enum BrainstormElementType {
  PICTURE = "PICTURE"
}

export default interface BrainstormElementModel {
  id: string;

  viewport: ViewportModel;
}
