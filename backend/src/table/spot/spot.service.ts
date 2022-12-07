import { Injectable } from '@nestjs/common';
import SpotModel from "./spot.model";
import { BehaviorSubject } from "rxjs";
import { v4 as new_guid } from "uuid";

@Injectable()
export class SpotService {
  private spots: SpotModel[] = [];
  public spots$ = new BehaviorSubject<{ spots: SpotModel[], changedSpot?: SpotModel }>({ spots: [] });

  public createSpot(position: { x: number, y: number }, tableId: string) {
    const id = new_guid()
    const spot = { id, position, tableId }
    this.spots.push(spot)
    this.spots$.next({ spots: this.spots, changedSpot: spot })
    return { spot, spots: this.spots }
  }

  public getSpot(id: string) {
    return this.spots.find(s => s.id === id)
  }
}
