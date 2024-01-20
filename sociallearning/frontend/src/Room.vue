<template>
    <div class="container">
        <div class="myBall">
            <router-view>
                <div class="Prompt" style="font-size:50px;font-weight: bold;">正在等待其他人加入游戏
                </div>
                <button class = selection 
                        :disabled="wait"
                        @click="startGame()"
                        id = 'join'>开始游戏</button>
            </router-view>
        </div>
    </div>
</template>
<style type= "text/css" scoped > 
    .container {
    display: grid; 
    grid-template-columns: 13.3fr 0.1fr 5.9fr; 
    grid-template-rows: 1.5fr 0.2fr 2.9fr; 
    gap: 0px 0px; 
    grid-template-areas: 
        "Prompt Prompt Prompt"
        "Prompt Prompt Prompt"
        "selection selection selection"; 
    }
    .Prompt {
        grid-area: Prompt; 
        position: absolute;
        left: 50%;
        top:20%;
        transform: translate(-50%,-50%);
    }
    .selection {
        grid-area: selection; 
        position: absolute;
        left: 50%;
        top:40%;
        transform: translate(-50%,-50%);
    }
    button{
        background-color:Teal;
        color:white;
        width: 100px;
        height: 45px;
        border:0;
        font-size: 16px;
        box-sizing: content-box;
        border-radius: 5px;
    }
    button:hover{
        background-color: DarkSlateGray;
    }
</style>
<script lang="ts">
import { getClient } from "./getClient";
import { defineComponent, nextTick } from "vue";
    export default defineComponent ({
    name:"room",
    data(){
		return {
        myUsername : this.$route.query.username,
        myRole : this.$route.query.role,
        myPosition:'',
        myColor:'',
        myRound : 1,
        myRoom : 1,
        wait : true, 
        client: getClient(),
	};
    },
    mounted(): void {
		// Connect at startup
        
		this.client.connect().then((v) => {
        this.joinRoom()
		if (!v.isSucc) {
			alert("= Client Connect Error 连接失败=\n" + v.errMsg);
		}
		})
		// Listen Msg
		this.client.listenMsg('RoomFull', v => {
            nextTick(() => {
                if(v.room === this.myRoom && v.isRoomFull === true){
                    this.wait = false
                }
            });
    });
  },
  methods:{
        async joinRoom():Promise<void>{
            let ret = await this.client.callApi('Room', {
                username:this.myUsername,
                role:this.myRole,
            });
            if (ret.isSucc) {
                this.myRoom = ret.res.room;
                console.log(this.myRoom);
                return;
            }
            if (!ret.isSucc) {
                console.log("加入房间失败");
                alert(ret.err.message)
                return;
            }
        },
        async startGame():Promise<void> {
                console.log(this.myRoom)
                const query = { username: this.myUsername, role: this.myRole,room:this.myRoom,round:this.myRound,position:this.myPosition}
                console.log(query)
                this.$router.push({name:'showReward', query:query})
                this.client.disconnect();
                return;
        },
    },
});
</script>
