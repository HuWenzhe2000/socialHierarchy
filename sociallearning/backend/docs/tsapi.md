
# TSRPC API 接口文档

## 通用说明

- 所有请求方法均为 `POST`
- 所有请求均需加入以下 Header :
    - `Content-Type: application/json`

## 目录

- [Choose](#/Choose)
- [GetNeighbor](#/GetNeighbor)
- [Login](#/Login)
- [Network](#/Network)
- [Room](#/Room)
- [Send](#/Send)
- [SetGame](#/SetGame)

---

## Choose <a id="/Choose"></a>

**路径**
- POST `/Choose`

**请求**
```ts
interface ReqChoose {
    username: string,
    position: string,
    choice: string,
    time: /*datetime*/ string,
    round: number
}
```

**响应**
```ts
interface ResChoose {
    time: /*datetime*/ string
}
```

---

## GetNeighbor <a id="/GetNeighbor"></a>

**路径**
- POST `/GetNeighbor`

**请求**
```ts
interface ReqGetNeighbor {
    position: string,
    round: number
}
```

**响应**
```ts
interface ResGetNeighbor {
    position: string[],
    choice: string[]
}
```

---

## Login <a id="/Login"></a>

**路径**
- POST `/Login`

**请求**
```ts
interface ReqLogin {
    username: string,
    role: string
}
```

**响应**
```ts
interface ResLogin {
    time: /*datetime*/ string
}
```

---

## Network <a id="/Network"></a>

**路径**
- POST `/Network`

**请求**
```ts
interface ReqNetwork {
    username: string
}
```

**响应**
```ts
interface ResNetwork {
    time: /*datetime*/ string
}
```

---

## Room <a id="/Room"></a>

**路径**
- POST `/Room`

**请求**
```ts
interface ReqRoom {
    username: string,
    role: string
}
```

**响应**
```ts
interface ResRoom {
    room: number
}
```

---

## Send <a id="/Send"></a>

**路径**
- POST `/Send`

**请求**
```ts
interface ReqSend {
    username: string,
    content: string
}
```

**响应**
```ts
interface ResSend {
    time: /*datetime*/ string
}
```

---

## SetGame <a id="/SetGame"></a>

**路径**
- POST `/SetGame`

**请求**
```ts
interface ReqSetGame {
    username: string,
    role: string,
    room: number,
    time: /*datetime*/ string
}
```

**响应**
```ts
interface ResSetGame {
    position: string,
    color: string
}
```

