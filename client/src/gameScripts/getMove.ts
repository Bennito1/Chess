
class GetMove {
    move(cord:number, newId:number, map:string[][]): string[][] {
        const yf = Math.floor(cord/10) -1
        const xf = cord - ((yf+1)*10) - 1
        const yid = Math.floor(newId/10) -1
        const xid = newId - ((yid+1)*10) - 1
        const f = map[yf][xf]
        map[yf][xf] = '0'
        map[yid][xid] = f
        return map
    }
}

export default GetMove