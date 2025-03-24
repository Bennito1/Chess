import { makeAutoObservable } from "mobx";

class MapStore{
    map:string[][] = [
        ['l', 'k', 's', 'q', 'kr', 's', 'k', 'l'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['L', 'K', 'S', 'Q', 'KR', 'S', 'K', 'L']
    ]

    constructor() {
        makeAutoObservable(this)
    }

    setMap(newMap:string[][]){
       this.map = newMap
    }
}

export const mapStore = new MapStore()