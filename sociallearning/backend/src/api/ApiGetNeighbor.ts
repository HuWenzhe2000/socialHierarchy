import { ApiCall } from "tsrpc";
import { server } from "..";
import { ReqGetNeighbor, ResGetNeighbor } from "../shared/protocols/PtlGetNeighbor";
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
/*
async function isAllChoose(room:number,round:number) {
    return new Promise(resolve=>{
        let sql: string= `select count(position) as num from choice where room = ${room} and round = ${round}`;
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
*/

export async function ApiGetNeighbor(call: ApiCall<ReqGetNeighbor, ResGetNeighbor>) {
    var  thisPosition = call.req.position;
    var  thisRound = call.req.round;
    var  thisRoom = call.req.room;

    let sql: string= `select network.end,choice.position, choice
          from choice left join network
          on choice.position = network.begin 
          where network.end = '${thisPosition}'
          and choice.stage = 's1' and choice.room='${thisRoom}' and choice.round='${thisRound}'
          `;
    conn.query(sql, (err:any, result:any) => {
        if (err) {
            console.log(err);
        } else {
            console.log("result"+result);
            var neighborPosition=[''];
            var neighborchoice=[''];
            result.forEach((item: { position: string;choice:string }) => {
                neighborPosition.push(item.position)
                neighborchoice.push(item.choice)
            });
            //neighborPosition = result[0].position
            //neighborchoice = result[0].choice
            console.log("position"+neighborPosition);
            console.log("choice"+neighborchoice);
            call.succ({
                position:neighborPosition,
                choice:neighborchoice
            })
        };
        })
        /*
    const allChoose = await isAllChoose(thisRoom,thisRound)
    if(allChoose){
        server.broadcastMsg('AllChoose', {
            room:thisRoom,
            round:thisRound,
            allChoose:true
        })
    }*/
}