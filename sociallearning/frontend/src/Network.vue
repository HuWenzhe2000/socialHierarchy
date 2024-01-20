<template>
    <div class="networkUI">
        <div class="myBall">
            <div id = "c" class="element"></div>
        </div>
        <div class="networkResult">
            <div id = "c0" class="element element_1"></div>
            <div id = "c1" class="element element_2"></div>
            <div id = "c2" class="element element_3"></div>
            <div id = "c3" class="element element_4"></div>
            <div id = "c4" class="element element_5"></div>
        </div>
    </div>
</template>
<style  type= "text/css" scoped>
    .networkUI {  display: grid;
    grid-template-columns: 0.5fr 0.1fr 2.6fr;
    grid-template-rows: 0.6fr 0.1fr 2.6fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
    "myBall myBall ."
    "myBall myBall ."
    ". . networkResult";
    }
    .myBall { grid-area: myBall; }
    .networkResult { 
        grid-area: networkResult;
    }
    .element {
        position: absolute;
        background: DimGrey;
        z-index : 1;
        border: 0.1875em solid #0F1C3F;
        border-radius: 50%;
        box-shadow: 0.375em 0.375em 0 0 rgba(15, 28, 63, 0.125);
        height: 7em;
        width: 7em;
    }
    .element_1 {top: 20%; left: 55%;background: DimGrey}
    .element_2 {top: 60%; left: 40%;background: DimGrey}
    .element_3 {top: 60%; left: 50%;background: DimGrey}
    .element_4 {top: 60%; left: 60%;background: DimGrey}
    .element_5 {top: 60%; left: 70%;background: DimGrey}
</style>


<script lang="ts">
import { getClient } from "./getClient";
import { defineComponent, nextTick } from "vue";
import LeaderLine from "../node_modules/leader-line/leader-line.min.js"
    export default defineComponent ({
    name:"network",
    data(){
		return {
        ready : false,
        myUsername:this.$route.query.username,
        myRole:this.$route.query.role,
        myPosition: this.$route.query.position,
        myColor:this.$route.query.color,
        myRoom:Number(this.$route.query.room),
        myStage: "s1",
        myRound :Number(this.$route.query.round),
        client: getClient(),
        line1 : LeaderLine,
        line2 : LeaderLine,
        line3 : LeaderLine,
        line4 : LeaderLine,
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
		this.client.listenMsg('BallColor', v => { 
			this.onBallColorMsg(v);
        
		// Scroll the list to the bottom
		/*
		nextTick(() => {
			
            document.body.remove(vm.$el)
		});
		*/
    });
    this.showMine()
    this.toSelect(3)
    this.draw()
    },
    beforeUnmount():void{
        this.line1.remove()
        this.line2.remove()
        this.line3.remove()
        this.line4.remove()
        //document.body.removeChild(this.line1)
        //this.$destroy(true);
        //this.$el.parentNode.removeChild(this.$el);
    },
    methods:{
        showMine(){
            document.getElementById("c").style.background=this.myColor
            document.getElementById(this.myPosition).style.background=this.myColor
        },
        draw(){
            const leader = document.getElementById('c0')
            const below1 = document.getElementById('c1')
            const below2 = document.getElementById('c2')
            const below3 = document.getElementById('c3')
            const below4 = document.getElementById('c4')
            this.line1 = new LeaderLine( below1, leader,{color:"black",path:"straight",endPlug:"behind"})
            this.line2 = new LeaderLine( below2, leader,{color:"black",path:"straight",endPlug:"behind"})
            this.line3 = new LeaderLine( below3, leader,{color:"black",path:"straight",endPlug:"behind"})
            this.line4 = new LeaderLine( below4, leader,{color:"black",path:"straight",endPlug:"behind"})

        },
        toSelect(secs:number){
            secs--
                if(secs>0){
                    setTimeout(() => {
                    this.toSelect(secs);
                    }, 1000);
            } else {
                this.ready = true
                const query = { username: this.myUsername, position:this.myPosition,
                                round: this.myRound,color:this.myColor,role:this.myRole,
                                stage:this.myStage,room:this.myRoom}
                console.log(query)
                this.$router.push({name:'choose', query:query})
            }
        },
        async sendPersonInfo() {
            let ret = await this.client.callApi('SetGame', {
                username:this.username,
                role:this.role,
                room:this.room,
                time:new Date()
            });
            // Error
            if (!ret.isSucc) {
                console.log("加入失败");
                alert(ret.err.message);
                return;
            }
        },
        onBallColorMsg(msg: string) {
            //this.elem.querySelector(`ontainer>networkResult>div,#${msg.networkPosition}`).style.background=msg.color;
            //var pos = <HTMLElement>this.elem.querySelector(`container>myBall>div,#${msg.networkPosition}`);
            console.log(msg)
            //pos.style.background=msg.color;
        },
    },
});
</script>
