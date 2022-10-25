import { Injectable } from "@angular/core";
import { DbBlock } from "src/app/modules/locations/page/blocks/blocks.model";
import { DbCountry } from "src/app/modules/locations/page/countries/countries.model";
import { DbDistrict } from "src/app/modules/locations/page/districts/districts.model";
import { DbRegion } from "src/app/modules/locations/page/regions/regions.model";
import { DbState } from "src/app/modules/locations/page/states/states.model";

@Injectable()
export class DataService {
  districtsFromBlock(blocks: DbBlock[]){
    return  uniq<DbDistrict>(blocks.map(block => block.district), 'name')
  }

  statesFromDistricts(districts: DbDistrict[]){
    return uniq<DbState>(districts.map(district=> district.state), 'name')
  }

  regionsFromStates(states: DbState[]){
    return uniq<DbRegion>(states.map(state=> state.region), 'name')
  }

  countriesFromRegion(regions: DbRegion[]) {
    return  uniq<DbCountry>(regions.map( region=> region.country), 'name')
  }

  getLastId (data: any) {
    return data.reduce((prev: number, curr: any) => prev = prev > Number(curr.id) ? prev : Number(curr.id), 0)
  }

  regionsFromCountry(country: DbCountry, regions: DbRegion[]) {
    console.log(country)
    console.log(regions.filter(region => region.country.id === country.id))
    return regions.filter(region => region.country.id === country.id)
  }

  statesFromRegion(region: DbRegion, states: DbState[]) {
    return states.filter(state => state.region.id === region.id)
  }

  districtsFromState(state: DbState, districts: DbDistrict[]) {
    return districts.filter(district => district.state.id === state.id)
  }

  blocksFromDistrict(district: DbDistrict, blocks: DbBlock[]) {
    return blocks.filter(block => block.district.id === district.id)
  }
}

function uniq<T>(array: T[], field: string) {
  return array.reduce((accumulator: any, current: any) => {
      let len = accumulator.filter((acc: any)=> acc[field] === current[field]).length

      if(!len) {
        accumulator.push(current)
      }
      return accumulator as T;
    }, [] as any
  )
}