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

    getID:boolean = false

    ID:number = 0

    gameColor:string = 'none'

    constructor() {
        makeAutoObservable(this)
    }

    setMap(newMap:string[][]){
       this.map = newMap
    }

    setGetId(GetId:boolean){
        this.getID = GetId
     }

     setID(newID:number){
        this.ID = newID
     }

     setGameColor(newColor:string){
        this.gameColor = newColor
     }
}

export const mapStore = new MapStore()