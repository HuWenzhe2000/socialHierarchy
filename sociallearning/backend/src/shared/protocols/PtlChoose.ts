
export interface ReqChoose {
    username:string
    position:string
    choice:string
    stage:string
    room:number
    round:number
    time:Date
}
export interface ResChoose {
    reward:number
    winOrlose: boolean
}