import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config.modal';

@Injectable()
export class ConfigService {
  configUrl = 'assets/config.json';

  getConfig() {
    return this.http.get<Config>(this.configUrl);
  }

  constructor(private http: HttpClient) { }
}