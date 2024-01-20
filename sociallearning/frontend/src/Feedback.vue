<template>
        <div class="myBall">
            <router-view>
                <div class="prompt" id="result" style="font-size:100px;font-weight: bold;">
                </div>
                <div  class = "reward" id="reward" style="font-size:100px;font-weight: bold;">0元
                </div>
                <button class = selection 
                        @click="startGame()"
                        id = 'join'>开始下一轮</button>
            </router-view>
        </div>
</template>
<style type= "text/css" scoped> 
    .prompt {
        position: absolute;
        left: 50%;
        top:20%;
        transform: translate(-50%,-50%);
    }
    .reward {
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    
    .selection {
        position: absolute;
        left: 50%;
        top:70%;
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
        myPosition : this.$route.query.position,
        myRoom:this.$route.query.room,
        myRole : this.$route.query.role,
        myRound :Number(this.$route.query.round)+1,
        reward: this.$route.query.reward,
        result : this.$route.query.result === 'true',
        client: getClient(),
	};
    },
    mounted(): void {
		// Connect at startup
        
		this.client.connect().then((v) => {
        //this.joinRoom()
        this.showResult()
		if (!v.isSucc) {
			alert("= Client Connect Error =\n" + v.errMsg);
		}
		});
		// Listen Msg
		this.client.listenMsg('RoomFull', v => { 
            console.log(v)
            nextTick(() => {
                this.wait = false
            });
    });
  },
  methods:{
        showResult(){
            if(this.result){
                console.log(typeof(this.result))
                document.getElementById("result").innerHTML = '猜对了'
            }else{
                console.log(this.result)
                document.getElementById("result").innerHTML = '猜错了'
            }
            document.getElementById("reward").innerHTML = `你的奖励是${this.reward}元`
        },
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
                if(this.myRound<3){
                    const query = { username: this.myUsername, role: this.myRole,room:this.myRoom,round:this.myRound,position:this.myPosition}
                    console.log(query)
                    this.$router.push({name:'showReward', query:query})
                    this.client.disconnect();
                }else{
                    this.$router.push({name:'end'})
                    this.client.disconnect();
                }
                return;
        },
    },
});
</script>
