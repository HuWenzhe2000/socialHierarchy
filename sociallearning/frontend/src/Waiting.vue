<template>
    <div class="container">
        <div class="myBall">
            <router-view>
                <div class="Prompt" style="font-size:50px;font-weight: bold;">正在等待其他人选择
                </div>
                <button class = selection 
                        :disabled = "wait"
                        @click="showNeighbor()"
                        id = 'getNeighbor'>再次选择</button>
            </router-view>
        </div>
    </div>
</template>
<style  type= "text/css" scoped > 
    .container {
    display: grid; 
    grid-template-columns: 13.3fr 0.1fr 5.9fr; 
    grid-template-rows: 1.5fr 0.2fr 2.9fr; 
    gap: 0px 0px; 
    grid-template-areas: 
        "Prompt2 Prompt2 Prompt2"
        "Prompt2 Prompt2 Prompt2"
        "start start start"; 
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
        myColor:this.$route.query.color,
        myChoice:this.$route.query.choice,
        myRound :Number(this.$route.query.round),
        myRoom : Number(this.$route.query.room),
        myNeighborPosList : [],
        myNeighborChoiceList : [],
        wait : true, 
        client: getClient(),
	};
    },
    mounted(): void {
		// Connect at startup
		this.client.connect().then((v: { isSucc: any; errMsg: string; }) => {
        //this.getNeighbor()
        this.checkAllChoose()
		if (!v.isSucc) {
			alert("= Client Connect Error =\n" + v.errMsg);
		}
		})
		// Listen Msg
		this.client.listenMsg('AllChoose', (v: any) => { 
            console.log(v)
            nextTick(() => {
                this.getNeighbor()
                if(v.room == this.myRoom && v.round == this.myRound)
                    this.wait = false
            });
    });
  },
  methods:{
        async checkAllChoose():Promise<void>{
            let ret = await this.client.callApi('Waiting', {
                room:this.myRoom,
                round:this.myRound,
            });
            
            if (!ret.isSucc) {
                console.log("进入等待序列失败");
            }
        },
        async getNeighbor():Promise<void>{
            let ret = await this.client.callApi('GetNeighbor', {
                room:this.myRoom,
                position:this.myPosition,
                round:this.myRound,
            });
            
            if (ret.isSucc) {
                this.myNeighborPosList = (ret.res.position || []).filter((element: string): element is string => {
                    return element !== '';
                    });
                this.myNeighborChoiceList = (ret.res.choice || []).filter((element: string): element is string => {
                    return element !== '';
                    });
                return;
            }
            if (!ret.isSucc) {
                console.log("获得邻居信息失败");
            }
        },
        async showNeighbor():Promise<void> {
            /*
            console.log(this.roomNumber)
            let ret = await this.client.callApi('SetGame', {
                username:this.myUsername,
                role:this.myRole,
                room:this.roomNumber,
                time:new Date()
            });
            // Error
            if (ret.isSucc) {
                console.log(ret);
                this.myPosition = ret.res.position
                this.mycolor = ret.res.color
            */
                const query = { username: this.myUsername,position:this.myPosition,
                                choice: this.myChoice,color:this.myColor,round:this.myRound,
                                myNeighborChoice:this.myNeighborChoiceList,myNeighborPost:this.myNeighborPosList,
                                room:this.myRoom,role:this.myRole}
                console.log(query)
                this.$router.push({name:'neighbor', query:query})
                this.client.disconnect();
                return;
        },
    },
});
</script>
