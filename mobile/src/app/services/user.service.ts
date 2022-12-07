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
  constructor(private http: HttpClient) { }

  fetchAll(): Promise<any> {
    return new Promise((resolve, reject) => this.http.get<UserModel[]>(httpHostname + "/user").subscribe((users) => {
      this.users = users;
      this.users$.next(this.users);
    }))
  }

  auth(id: string) {
    return new Promise((resolve, reject)=> this.http.post<{ tableId: string }>(httpHostname + "/user/auth", { id }).subscribe((_) => {
      resolve({})
    }, error => reject(error)))
  }
}
