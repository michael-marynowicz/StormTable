import BrainstormElementModel from "./brainstorm-element.model";

export default interface MeetingSessionModel {
  id: string;
  name: string;

  elements: BrainstormElementModel[];
}
