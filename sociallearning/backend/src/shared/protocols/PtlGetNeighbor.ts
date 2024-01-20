export interface ReqGetNeighbor {
    position:string
    round:number
    room:number
}
export interface ResGetNeighbor {
    position:string[]
    choice:string[]
}