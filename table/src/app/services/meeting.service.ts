import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MeetingModel} from "../models/meeting.model";

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  constructor(private http: HttpClient) {
  }

  async getMeetings(): Promise<MeetingModel[]> {
    return new Promise((resolve, reject) => this.http.get<MeetingModel[]>("http://localhost:3000/meeting").subscribe(meetings => resolve(meetings), reject))
  }
}
