import { ServiceProto } from 'tsrpc-proto';
import { MsgAllChoose } from './MsgAllChoose';
import { MsgBallColor } from './MsgBallColor';
import { MsgChat } from './MsgChat';
import { MsgRoomFull } from './MsgRoomFull';
import { ReqChoose, ResChoose } from './PtlChoose';
import { ReqGetNeighbor, ResGetNeighbor } from './PtlGetNeighbor';
import { ReqLogin, ResLogin } from './PtlLogin';
import { ReqNetwork, ResNetwork } from './PtlNetwork';
import { ReqRoom, ResRoom } from './PtlRoom';
import { ReqSend, ResSend } from './PtlSend';
import { ReqSetGame, ResSetGame } from './PtlSetGame';
import { ReqWaiting, ResWaiting } from './PtlWaiting';

export interface ServiceType {
    api: {
        "Choose": {
            req: ReqChoose,
            res: ResChoose
        },
        "GetNeighbor": {
            req: ReqGetNeighbor,
            res: ResGetNeighbor
        },
        "Login": {
            req: ReqLogin,
            res: ResLogin
        },
        "Network": {
            req: ReqNetwork,
            res: ResNetwork
        },
        "Room": {
            req: ReqRoom,
            res: ResRoom
        },
        "Send": {
            req: ReqSend,
            res: ResSend
        },
        "SetGame": {
            req: ReqSetGame,
            res: ResSetGame
        },
        "Waiting": {
            req: ReqWaiting,
            res: ResWaiting
        }
    },
    msg: {
        "AllChoose": MsgAllChoose,
        "BallColor": MsgBallColor,
        "Chat": MsgChat,
        "RoomFull": MsgRoomFull
    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 26,
    "services": [
        {
            "id": 11,
            "name": "AllChoose",
            "type": "msg"
        },
        {
            "id": 5,
            "name": "BallColor",
            "type": "msg"
        },
        {
            "id": 0,
            "name": "Chat",
            "type": "msg"
        },
        {
            "id": 9,
            "name": "RoomFull",
            "type": "msg"
        },
        {
            "id": 6,
            "name": "Choose",
            "type": "api"
        },
        {
            "id": 10,
            "name": "GetNeighbor",
            "type": "api"
        },
        {
            "id": 1,
            "name": "Login",
            "type": "api"
        },
        {
            "id": 2,
            "name": "Network",
            "type": "api"
        },
        {
            "id": 8,
            "name": "Room",
            "type": "api"
        },
        {
            "id": 3,
            "name": "Send",
            "type": "api"
        },
        {
            "id": 4,
            "name": "SetGame",
            "type": "api"
        },
        {
            "id": 12,
            "name": "Waiting",
            "type": "api"
        }
    ],
    "types": {
        "MsgAllChoose/MsgAllChoose": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "room",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "round",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 0,
                    "name": "allChoose",
                    "type": {
                        "type": "Boolean"
                    }
                }
            ]
        },
        "MsgBallColor/MsgBallColor": {
            "type": "Interface",
            "properties": [
                {
                    "id": 2,
                    "name": "position",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "color",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "MsgChat/MsgChat": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "MsgRoomFull/MsgRoomFull": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "room",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 0,
                    "name": "isRoomFull",
                    "type": {
                        "type": "Boolean"
                    }
                }
            ]
        },
        "PtlChoose/ReqChoose": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "position",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "choice",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 6,
                    "name": "stage",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 7,
                    "name": "room",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 5,
                    "name": "round",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 3,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "PtlChoose/ResChoose": {
            "type": "Interface",
            "properties": [
                {
                    "id": 2,
                    "name": "reward",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "winOrlose",
                    "type": {
                        "type": "Boolean"
                    }
                }
            ]
        },
        "PtlGetNeighbor/ReqGetNeighbor": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "position",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "round",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "room",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "PtlGetNeighbor/ResGetNeighbor": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "position",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
                    }
                },
                {
                    "id": 1,
                    "name": "choice",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
                    }
                }
            ]
        },
        "PtlLogin/ReqLogin": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "role",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlLogin/ResLogin": {
            "type": "Interface",
            "properties": [
                {
                    "id": 2,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "PtlNetwork/ReqNetwork": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlNetwork/ResNetwork": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "PtlRoom/ReqRoom": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "role",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlRoom/ResRoom": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "room",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "PtlSend/ReqSend": {
            "type": "Interface",
            "properties": [
                {
                    "id": 3,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlSend/ResSend": {
            "type": "Interface",
            "properties": [
                {
                    "id": 2,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "PtlSetGame/ReqSetGame": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "role",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 5,
                    "name": "position",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "round",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 3,
                    "name": "room",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "PtlSetGame/ResSetGame": {
            "type": "Interface",
            "properties": [
                {
                    "id": 3,
                    "name": "position",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "color",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlWaiting/ReqWaiting": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "round",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "room",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "PtlWaiting/ResWaiting": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        }
    }
};