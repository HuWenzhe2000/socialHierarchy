import { ApiCall } from "tsrpc";
import { server } from "..";
import { ReqSetGame, ResSetGame } from "../shared/protocols/PtlSetGame";


const mysql = require('mysql');
const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'guessBall'
});
conn.connect();

const subordinateArray:string[] = ['c1','c2','c3','c4']
let bind = [
    {room:1, round:1,order:subordinateArray},
];

function getPosition(roomNum:number,roundNum:number){
    let roomExist = false 
    let roundExist = false
    bind.forEach(function (item){
        if(item.room == roomNum){
            roomExist = true
        }
        if(item.round == roundNum){
            roundExist = true
        }
    })
    if (roomExist && roundExist){
        console.log(roomExist)
        let pos =bind.find(obj => obj.room === roomNum && obj.round === roundNum)?.order.shift() 
        console.log(pos)
        return pos
    }else{    
        subordinateArray.sort(function() { return 0.5 - Math.random()})
        bind.push( { room:roomNum , round:roundNum,order: subordinateArray } )
        let pos = <string>getPosition(roomNum,roundNum) 
        return pos 
    }
}
const yellow = "chocolate"
const blue = "royalblue"
function getAnswer(username:string,round:number,room:number){
    let sql: string= `select answer from setgame where room =${room}`;
    conn.query(sql, (err:any, result:any) => {
        if (err) {
            console.log(err);
        } else {
            if(result[0].answer){
                let answer = result[0].answer 
                let sql2 : string = `update setgame set answer = '${result[0].answer}' where username = '${username}' and round = ${round}` 
                conn.query(sql2)
                return answer
            }else{
                const answerFlag = Boolean(Math.round(Math.random()))
                let answer : string
                if(answerFlag){
                    answer = yellow
                }else{
                    answer = blue
                }
                let sql3 : string = `update setgame set answer = '${answer}' where username = '${username}' and round = ${round}` 
                conn.query(sql3)
                return answer
            }
            };
         })
}
function getColor(answer:any){
    console.log(answer)
    if(answer){
        /**
         * answer：1 =>蓝色多，2=>黄色多
         */
        const colorList:string[] = [blue,blue,blue,yellow,yellow]
        colorList.sort(function() { return 0.5 - Math.random()});
        return colorList[0]
    }else{
        const colorList:string[] = [blue,blue,yellow,yellow,yellow]
        colorList.sort(function() { return 0.5 - Math.random()});
        return colorList[0]
    }
}
export async function ApiSetGame(call: ApiCall<ReqSetGame, ResSetGame>) {
    console.log(call.req)
    var  thisUsername = call.req.username;
    var  thisRound = call.req.round;
    var  thisRole = call.req.role;
    var  thisRoom = call.req.room;
    var  thisTime = call.req.time;
    var  thisColor = '';
    var  thisPosition =  call.req.position;
    //answer
    if(!thisPosition){
        if (thisRole === "shangji" ){
            thisPosition = 'c0' ;
      }else{
            thisPosition = getPosition(thisRoom,thisRound) ||''
            call.logger.log(thisPosition)
      }
    }
    let sql: string= `insert into setgame(username,position,round,room) value('${thisUsername}','${thisPosition}','${thisRound}','${thisRoom}')`;
    conn.query(sql, (err:any, result:any) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            var  thisAnswer = getAnswer(thisUsername,thisRound,thisRoom);
            thisColor = getColor(thisAnswer);
            let sql2: string= `update setgame set color = '${thisColor}' where username = '${thisUsername}' and round = ${thisRound}`;
            conn.query(sql2, (err:any, result:any) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                    call.succ({
                        position:thisPosition,
                        color:thisColor
                    })
                    };
                })
                    };
         })
    
}