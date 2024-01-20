import { ApiCall } from "tsrpc";
import { ReqRoom, ResRoom } from "../shared/protocols/PtlRoom";
import { MsgRoomFull} from "../shared/protocols/MsgRoomFull";
import { server } from "..";
import { exists } from "fs";
import { resolve } from "path";
import { BlockList } from "net";
import { BroadcastChannel } from "worker_threads";

const mysql = require('mysql');
const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'guessBall'
});
const maxRoomSize = 2
conn.connect();
//异步执行
async function getLatestRoomNumber():Promise<number>{
    return new Promise(resolve=>{
        let sql1: string= `select max(roomNumber) as max from user`;
        conn.query(sql1, (err:any, result:any) => {
            if (err) {
                console.log(err);
            } else {
                if(result[0].max){
                    resolve (<number> result[0].max)
                }else{
                    resolve(1)
                }
            }
    })
})
}
async function getRoomPeopleNumber(room:number):Promise<number> {
    return new Promise(resolve=>{
        let sql2:string= `select count(roomNumber) as number from user where roomNumber = ${room}`;
        conn.query(sql2, (err:any, result:any) => {
            if (err) {
                console.log(err);
            } else {
                console.log("房间人数"+<number>result[0].number)
                resolve(<number>result[0].number)
            }   
    })
})
}
async function setRoom(username:string,room:number) {
    let sql3: string= `update user set roomNumber = '${room}' where username = '${username}'`;
    conn.query(sql3, (err:any, result:any) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
            })
}
export default async function (call: ApiCall<ReqRoom, ResRoom>) {
    // TODO
    var thisUsername = call.req.username;
    var thisRole = call.req.role;
    var roomNumber! : number;
    const latestUsedRoomNumber = await getLatestRoomNumber()
    const peopleNumber = await getRoomPeopleNumber(latestUsedRoomNumber)
    console.log(latestUsedRoomNumber)
    if(peopleNumber <maxRoomSize){
        roomNumber = latestUsedRoomNumber
        await setRoom(thisUsername,roomNumber)
        call.succ(
            {
                room:roomNumber
            }
        )
        if(peopleNumber==(maxRoomSize-1)){
            server.broadcastMsg("RoomFull",{room:latestUsedRoomNumber,isRoomFull:true})
        }
            }else{
                roomNumber = latestUsedRoomNumber + 1
                await setRoom(thisUsername,roomNumber)
                call.succ(
                    {
                        room:roomNumber
                    }
                )
            }
    
}