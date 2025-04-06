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

    enemyColor:string = 'none'

    moveColor:string = 'white'

    valeState:boolean = false

    L_leftMove:boolean = false
    L_rightMove:boolean = false
    K_Move:boolean = false


    constructor() {
        makeAutoObservable(this)
    }

    setLleftmove(GetId:boolean){
        this.L_leftMove = GetId
     }

     setLRightmove(GetId:boolean){
        this.L_leftMove = GetId
     }

     setKmove(GetId:boolean){
        this.L_leftMove = GetId
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
        if (newColor == "white"){
            this.enemyColor = "black"
        }
        else{
            this.enemyColor = "white"
        }
     }

     setMoveColor(newColor:string){
      this.moveColor = newColor
     }
}

export const mapStore = new MapStore()