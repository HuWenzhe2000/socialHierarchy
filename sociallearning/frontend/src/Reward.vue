<template>
    <div class="container">
        <div class="myBall">
            <router-view>
                <div class="Prompt" style="font-size:50px;font-weight: bold;">1元
                </div>
                <button class = selection 
                        @click="startRound()"
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
        myPosition:this.$route.query.position,
        myColor:'',
        myRound :Number(this.$route.query.round),
        myRoom : Number(this.$route.query.room),
        //wait : true, 
        client: getClient(),
    };
    },
    mounted(): void {
		// Connect at startup
        
		this.client.connect().then((v) => {
		if (!v.isSucc) {
			alert("= Client Connect Error =\n" + v.errMsg);
		}
		});
		// Listen Msg
        /*
		this.client.listenMsg('RoomFull', v => { 
            console.log(v)
            nextTick(() => {
                this.wait = false
            });
    });*/
  },
  methods:{
    async startRound():Promise<void> {
            let ret = await this.client.callApi('SetGame', {
                username:this.myUsername,
                position:this.myPosition,
                round:this.myRound,
                role:this.myRole,
                room:this.myRoom,
                time:new Date()
            });
            // Error
            if (ret.isSucc) {
                console.log(ret);
                this.myPosition = ret.res.position
                this.mycolor = ret.res.color
                const query = { username: this.myUsername, 
                                position:this.myPosition,color: this.mycolor,
                                round:this.myRound,role:this.myRole,
                                room:this.myRoom
                                }
                console.log(query)
                this.$router.push({name:'network', query:query})
                this.client.disconnect();
                return;
            }
        }
    },
});
</script>
