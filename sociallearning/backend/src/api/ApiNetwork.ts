import { ApiCall } from "tsrpc";
import { ReqNetwork, ResNetwork } from "../shared/protocols/PtlNetwork";

export default async function (call: ApiCall<ReqNetwork, ResNetwork>) {
    // TODO
    call.error('API Not Implemented');
}