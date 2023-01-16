import { Injectable } from '@angular/core';
import UserModel from "../models/user.model";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {httpHostname} from "../config";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: UserModel[] = []
  users$ = new BehaviorSubject<UserModel[]>([]);
  constructor(private http: HttpClient) {
    this.fetchAll();
  }

  fetchAll(): Promise<any> {
    return new Promise((resolve, reject) => this.http.get<UserModel[]>("{main}/user").subscribe((users) => {
      this.users = users;
      this.users$.next(this.users);
      resolve({})
    }))
  }

  auth(spotId: string, userId: string) {
    return this.http.post<unknown>("{main}/mobile/auth", {spotId, userId}).toPromise().then((_) => {
    })
  }
}
