import { ApiCall } from "tsrpc";
import { server } from "..";
import { ReqWaiting, ResWaiting } from "../shared/protocols/PtlWaiting";
import { resolve } from "path";

const maxRoomSize = 2
const mysql = require('mysql');
const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'guessBall'
});
conn.connect();
async function isAllChoose(room:number,round:number) {
    return new Promise(resolve=>{
        let sql: string= `select count(position) as num from choice where room = ${room} and round = ${round} and stage = 's1'`;
        conn.query(sql, (err:any, result:any) => {
            if (err) {
                console.log(err);
            } else {
                if(result[0].num === maxRoomSize)
                    resolve(true)
                else{
                    resolve(false)
                }
            }
    })
    })
}

export async function ApiWaiting(call: ApiCall<ReqWaiting, ResWaiting>) {
    var  thisRound = call.req.round;
    var  thisRoom = call.req.room;
    const allChoose = await isAllChoose(thisRoom,thisRound)
    console.log(allChoose)
    if(allChoose){
        server.broadcastMsg('AllChoose', {
            room:thisRoom,
            round:thisRound,
            allChoose:true
        })
    }
}