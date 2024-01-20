export interface ReqSetGame {
    username:string;
    role:string;
    position:string;
    round:number;
    room:number;
    time:Date
}
export interface ResSetGame {
    position:string;
    color:string
}