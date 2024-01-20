import { ApiCall } from "tsrpc";
import { ReqSend, ResSend } from "../shared/protocols/PtlSend";

export default async function (call: ApiCall<ReqSend, ResSend>) {
    // TODO
    call.error('API Not Implemented');
}