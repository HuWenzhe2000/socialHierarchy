import { ApiCall } from "tsrpc";
import { server } from "..";
import { ReqChoose, ResChoose } from "../shared/protocols/PtlChoose";


const mysql = require('mysql');
const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'guessBall'
});

const bonusWinReward = 1.5
const bonusLostPunish = -1.5
const basicWinReward = 1
const basicLostPunish = -1
conn.connect();

function getAnswer(username:string,round:number){
    return new Promise(resolve =>{
        let sql: string= `select answer from setgame where username ='${username}' and round = ${round}`
        conn.query(sql, (err:any, result:any) => {
            if (err) {
                console.log(err);
                return 'err'
                } else {
                    result[0].answer;
                    resolve(result[0].answer);
                };
            })
    })
}
function countChoice(room:number,round:number){
    return new Promise(resolve =>{
    let choiceNum = 0
    let sql2: string=`select count(DISTINCT b.choice) as num from
    (select username,round,room from setgame where room = ${room})a
    left join 
    (select username, round,choice from choice where round = ${round} and stage = 's2')b 
    ON
    a.username = b.username and a.round = b.round  `
    conn.query(sql2, (err:any, result:any) => {
           if (err) {
                console.log(err);
            } else {
                choiceNum = result[0].num
                resolve(choiceNum);
            };
        })
    })
}
async function getReward(username:string,position:string,room:number,round:number,choice:string):Promise<number>{
    let  isWin = false
    let isDifferent = false
    const answer = await getAnswer(username,round)
    console.log("answer",answer)
    console.log("choice",choice)
    if (choice === answer){
        isWin = true
    }
    const choiceNum = await countChoice(room,round)
    console.log("choiceNum",choiceNum)
    if(choiceNum !== 1){
        isDifferent = true
        if(isWin){
            return bonusWinReward
        }else{
            return bonusLostPunish
        }
        }else{
        if(position === 'c0'){
            if(isWin){
                return bonusWinReward
            }else{
                return bonusLostPunish
            }
        }else{
            if(isWin){
                return basicWinReward
            }else{
                return basicLostPunish
            }
        }
        };
}


export async function ApiChoose(call: ApiCall<ReqChoose, ResChoose>) {
    var  thisUsername = call.req.username;
    var  thisTime = call.req.time.format("YYYY-MM-DD hh:mm:ss");
    var  thisChoice= call.req.choice;
    var  thisPosition = call.req.position;
    var  thisRound = call.req.round;
    var  thisStage = call.req.stage;
    var  thisRoom = call.req.room;
    var  thisReward = 0;
    var  isWin = true
    let sql: string= `insert into choice(username,position,choice,round,time,stage,room) 
            value('${thisUsername}','${thisPosition}','${thisChoice}','${thisRound}','${thisTime}','${thisStage}','${thisRoom}')`;
    
    conn.query(sql, (err:any, result:any) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
         };
         })
        thisReward = await getReward(thisUsername,thisPosition,thisRoom,thisRound,thisChoice)
        let sql2: string= `update choice set reward = '${thisReward}' where username='${thisUsername}' and stage = '${thisStage}'`;
        conn.query(sql2, (err:any, result:any) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
             };
             })
        if(thisReward>0){
            isWin = true
        }else{
            isWin = false
        }
        call.succ({
            reward:thisReward,
            winOrlose:isWin
        })
    }  