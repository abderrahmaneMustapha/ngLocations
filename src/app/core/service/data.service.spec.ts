import { DbBlock } from 'src/app/modules/locations/page/blocks/blocks.model';
import { DbRegion } from 'src/app/modules/locations/page/regions/regions.model';
import { DataService, uniq } from './data.service';

let blocks = [
  {
    "id": 0,
    "isDefault": true,
    "code": "1411",
    "description": "azeaze",
    "name": "1411",
    "district": {
      "code": "141",
      "state": {
        "code": "14",
        "region": {
          "code": "DZD01",
          "country": {
            "code": "DZD",
            "description": "azeaze",
            "isDefault": true,
            "name": "Algeria",
            "id": 0
          },
          "description": "azeaze",
          "isDefault": true,
          "name": "REGION DZ 01",
          "id": 0
        },
        "description": "azeaze",
        "isDefault": true,
        "name": "Tiaret",
        "id": 0
      },
      "description": "azeaze",
      "isDefault": true,
      "name": "142",
      "id": 0
    }
  },
  {
    "id": 1,
    "isDefault": true,
    "code": "1412",
    "description": "azeaze",
    "name": "1412",
    "district": {
      "code": "141",
      "state": {
        "code": "14",
        "region": {
          "code": "DZD01",
          "country": {
            "code": "DZD",
            "description": "azeaze",
            "isDefault": true,
            "name": "Algeria",
            "id": 0
          },
          "description": "azeaze",
          "isDefault": true,
          "name": "REGION DZ 01",
          "id": 0
        },
        "description": "azeaze",
        "isDefault": true,
        "name": "Tiaret",
        "id": 0
      },
      "description": "azeaze",
      "isDefault": true,
      "name": "k",
      "id": 0
    }
  }
]

let districts = [
  {
    "code": "141",
    "state": {
      "code": "14",
      "region": {
        "code": "DZD01",
        "country": {
          "code": "DZD",
          "description": "azeaze",
          "isDefault": true,
          "name": "Algeria",
          "id": 0
        },
        "description": "azeaze",
        "isDefault": true,
        "name": "REGION DZ 01",
        "id": 0
      },
      "description": "azeaze",
      "isDefault": true,
      "name": "Tiaret",
      "id": 0
    },
    "description": "azeaze",
    "isDefault": true,
    "name": "142",
    "id": 0
  },
  {
    "code": "141",
    "state": {
      "code": "14",
      "region": {
        "code": "DZD01",
        "country": {
          "code": "DZD",
          "description": "azeaze",
          "isDefault": true,
          "name": "Algeria",
          "id": 0
        },
        "description": "azeaze",
        "isDefault": true,
        "name": "REGION DZ 01",
        "id": 0
      },
      "description": "azeaze",
      "isDefault": true,
      "name": "Tiaret",
      "id": 0
    },
    "description": "azeaze",
    "isDefault": true,
    "name": "k",
    "id": 0
  }
]

let states = [
  {
    "code": "14",
    "region": {
      "code": "DZD01",
      "country": {
        "code": "DZD",
        "description": "azeaze",
        "isDefault": true,
        "name": "Algeria",
        "id": 0
      },
      "description": "azeaze",
      "isDefault": true,
      "name": "REGION DZ 01",
      "id": 0
    },
    "description": "azeaze",
    "isDefault": true,
    "name": "Tiaret",
    "id": 0
  },
  {
    "code": "13",
    "region": {
      "code": "DZD03",
      "country": {
        "code": "DZD",
        "description": "azeaze",
        "isDefault": true,
        "name": "Algeria",
        "id": 0
      },
      "description": "azeaze",
      "isDefault": true,
      "name": "REGION DZ 03",
      "id": 0
    },
    "description": "azeaze",
    "isDefault": true,
    "name": "Tiaret",
    "id": 0
  }
]

let regions = [
  {
    "code": "DZD01",
    "country": {
      "code": "DZD",
      "description": "azeaze",
      "isDefault": true,
      "name": "Algeria",
      "id": 0
    },
    "description": "azeaze",
    "isDefault": true,
    "name": "REGION DZ 01",
    "id": 0
  },
  {
    "code": "KSA03",
    "country":  {
      "code": "KSA",
      "description": "azeaze",
      "isDefault": true,
      "name": "Saudi Arabia",
      "id": 1
    },
    "description": "azeaze",
    "isDefault": true,
    "name": "REGION KSA 03",
    "id": 0
  }
]

let countries = [
  {
    "code": "KSA",
    "description": "azeaze",
    "isDefault": true,
    "name": "Saudi Arabia",
    "id": 1
  },
  {
    "code": "DZD",
    "description": "azeaze",
    "isDefault": true,
    "name": "Algeria",
    "id": 0
  },
  {
    "code": "TN",
    "description": "azeaze",
    "isDefault": true,
    "name": "Tunisia",
    "id": 2
  },
]

let duplicatedRegions = [
  {
    "code": "DZD01",
    "country": {
      "code": "DZD",
      "description": "azeaze",
      "isDefault": true,
      "name": "Algeria",
      "id": 0
    },
    "description": "azeaze",
    "isDefault": true,
    "name": "REGION DZ 01",
    "id": 0
  },
  {
    "code": "DZD01",
    "country": {
      "code": "DZD",
      "description": "azeaze",
      "isDefault": true,
      "name": "Algeria",
      "id": 0
    },
    "description": "azeaze",
    "isDefault": true,
    "name": "REGION DZ 01",
    "id": 0
  },
  {
    "code": "DZD01",
    "country": {
      "code": "DZD",
      "description": "azeaze",
      "isDefault": true,
      "name": "Algeria",
      "id": 0
    },
    "description": "azeaze",
    "isDefault": true,
    "name": "REGION DZ 01",
    "id": 0
  },
]

describe('DataService', () => {
  let service: DataService
  beforeEach(() => { service = new DataService() })

  it('get districts from blocks', () => {
    expect(service.districtsFromBlock(blocks)).toEqual(districts)
  })

  it('get states from districts', () => {
    expect(service.statesFromDistricts(districts)).toEqual([states[0]])
  })

  it('get regions from states', () => {
    expect(service.regionsFromStates(states)).toEqual([regions[0], {
      "code": "DZD03",
      "country": {
        "code": "DZD",
        "description": "azeaze",
        "isDefault": true,
        "name": "Algeria",
        "id": 0
      },
      "description": "azeaze",
      "isDefault": true,
      "name": "REGION DZ 03",
      "id": 0
    }])
  })

  it('get last id from an array of objects', () => {
    expect(service.getLastId(countries)).toBe(2)
    expect(service.getLastId(blocks)).toBe(1)
  })

  it('filter a regions by a country name', () => {
    expect(service.regionsFromCountry("Algeria", regions)).toEqual([regions[0]])
  })

  it('filter a states by a region name', () => {
    expect(service.statesFromRegion("REGION DZ 01", states)).toEqual([states[0]])
  })

  it('filter districts by a state name', () => {
    expect(service.districtsFromState("Tiaret", districts)).toEqual(districts)
  })

  it('filter blocks by a district name', () => {
    expect(service.blocksFromDistrict("142", blocks)).toEqual([blocks[0]])
  })

  it('get unique value from an array of dicts', () => {
    expect(uniq<DbRegion>(duplicatedRegions, 'name')).toEqual([duplicatedRegions[0]])
  })
})
