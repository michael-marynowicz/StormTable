import {ElementType} from "./brainstorm-element.model";

export default interface DocumentModel {
  id: string;
  name: string;
  type: ElementType;
  path: string;
  position: { x: number, y: number }
  rotation: number,
  parent?:string
}
