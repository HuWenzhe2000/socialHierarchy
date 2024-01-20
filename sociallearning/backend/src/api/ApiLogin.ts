import { ApiCall } from "tsrpc";
import { server } from "..";
import { ReqLogin, ResLogin } from "../shared/protocols/PtlLogin";

const mysql = require('mysql');
const conn = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '123456',
   database: 'guessBall'
});
conn.connect();

export async function ApiLogin (call: ApiCall<ReqLogin, ResLogin>) {
    // TODO
    call.succ({
      time: new Date()
  })
  call.logger.log(call.req);
  var thisUsername = call.req.username;
  var thisRole = call.req.role;
  let sql: string= `insert into user(username,role) value('${thisUsername}','${thisRole}')`;
  conn.query(sql, (err:any, result:any) => {
        if (err) {
          call.logger.log(err);
        } else {
          call.logger.log(result);
        }
    })
}