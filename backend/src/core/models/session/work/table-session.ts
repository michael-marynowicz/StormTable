import SpotModel from "../../spot.model";

export default interface TableSession {
  id: string;
  spots: SpotModel[];
}
