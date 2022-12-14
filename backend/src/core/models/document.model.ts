import {ElementType} from "./element-types-enum";

export default interface DocumentModel {

  id: string;
  name: string;
  type: ElementType;
  path: string;
}