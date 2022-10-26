import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Config } from "src/app/config/config.modal";
import { DbBlock } from "./blocks.model";

@Injectable()
export class BlocksService {

  constructor(private http: HttpClient) {
  }

  getBlocks(config: Config) {
    return this.http.get<DbBlock[]>(config.blocksUrl)
  }

  addBlock(block: DbBlock, config: Config, id: number) {
    let createParams =  {
        id: id,
        isDefault: true,
        code: block.code,
        description: block.description,
        name: block.name,
        district: block.district
      }

    return this.http.post(config.blocksUrl, createParams)
  }

  updateBlock(block: DbBlock, config: Config) {
    let createParams =  {
        id: block.id,
        isDefault: true,
        code: block.code,
        description: block.description,
        name: block.code,
        district: block.district
      }

    return this.http.put(config.blocksUrl + `/${block.id}`, createParams)
  }

  deleteBlock(config: Config, id: number) {
    return this.http.delete(config.blocksUrl + `/${id}`)
  }
}
