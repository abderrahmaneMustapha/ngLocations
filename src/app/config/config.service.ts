import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config.modal';

@Injectable()
export class ConfigService {
  configUrl = 'assets/config.json';

  getConfig() {
    return this.http.get<Config>(this.configUrl);
  }

  getLastId (data: any) {
    return data.reduce((prev: number, curr: any) => prev = prev > Number(curr.id) ? prev : Number(curr.id), 0)
  }
  constructor(private http: HttpClient) { }
}