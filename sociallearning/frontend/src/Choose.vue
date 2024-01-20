<template>
	<div class="chooseUI">
			<div class="Prompt" style="font-size:50px;font-weight: bold;">你觉得哪种颜色的球多？
			</div>
    <div class="selection">
      <div id = "chocolate" button @click="sendChoice($event)" class="element element_1"></div>
      <div id = "royalblue" button @click="sendChoice($event)" class="element element_2"></div>
    </div>
</div>
</template>
<style scoped type= "text/css" >
.chooseUI {
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
	left: 35%; 
	top: 20%;}
.selection { grid-area: selection; }
.element {
	position: absolute;
	background: #456BD9;
	z-index : 1;
	border: 0.1875em solid #0F1C3F;
	border-radius: 50%;
	box-shadow: 0.375em 0.375em 0 0 rgba(15, 28, 63, 0.125);
	height: 5em;
	width: 5em;
}
.element_1 {top: 50%; left: 30%;background: chocolate}
.element_2 {top: 50%; left: 65%;background: royalblue}
</style>
<script lang="ts">
import { getClient } from "./getClient";
import { defineComponent, nextTick } from "vue";
export default defineComponent({
	name:"Choose",
	data() {
		return {
			myUsername : this.$route.query.username,
			myPosition : this.$route.query.position,
			myColor:this.$route.query.color,
			myRole : this.$route.query.role,
			myRound : Number(this.$route.query.round),
			myRoom :Number(this.$route.query.room),
			myStage : this.$route.query.stage,
			myChoice:'',
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
  },
  methods:{
	async sendChoice(a:Event) {
		console.log(this.myRound)
		this.myChoice = (a.currentTarget as HTMLInputElement).id
		let ret = await this.client.callApi('Choose', {
			username:this.myUsername,
			position:this.myPosition,
            choice:this.myChoice,
            time:new Date(),
            round: this.myRound, 
			room:this.myRoom,
			stage:this.myStage
		});
	if (ret.isSucc) {
		if(this.myStage === 's1'){
			const query = { username: this.myUsername,position:this.myPosition,
							choice:this.myChoice, round: this.myRound,
							color: this.myColor,stage:this.myStage,
							room:this.myRoom,role:this.myRole}
			this.$router.push({name:'waiting', query:query})
		}else{
			const reward = ret.res.reward
			const winOrlose = ret.res.winOrlose
			const query = { username: this.myUsername,reward:reward,result:winOrlose,room:this.myRoom, round: this.myRound,role:this.myRole,position:this.myPosition}
			this.$router.push({name:'feedback', query:query})
		}
	}
	},
	/*
	onBallColorMsg(msg: MsgBallColor) {
	//this.elem.querySelector(`ontainer>networkResult>div,#${msg.networkPosition}`).style.background=msg.color
	//var pos = <HTMLElement>this.elem.querySelector(`container>myBall>div,#${msg.networkPosition}`)
	//pos.style.background=msg.color
	console.log(msg)
	},
	*/
},
});
</script >
