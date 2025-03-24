
class GetMove {
    move(cord:number, newId:number, map:string[][]){
        const newMap= map.map(row => row.map(String))
        const yf = Math.floor(cord/10) -1
        const xf = cord - ((yf+1)*10) - 1
        const yid = Math.floor(newId/10) -1
        const xid = newId - ((yid+1)*10) - 1
        const f = newMap[yf][xf]
        newMap[yf][xf] = '0'
        newMap[yid][xid] = f
        return newMap

    }
}

export default GetMove