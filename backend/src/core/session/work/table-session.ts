import SpotModel from "../../models/spot.model";

export default interface TableSession {
  id: string;
  spots: SpotModel[];
}
