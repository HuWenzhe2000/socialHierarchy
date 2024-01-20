<template>
    <div class="container">
        <div class="myBall">
            <router-view>
                <div class="Prompt" id="result" style="font-size:100px;font-weight: bold;">游戏结束
                </div>
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
</style>
<script lang="ts">
import { getClient } from "./getClient";
import { defineComponent, nextTick } from "vue";
    export default defineComponent ({
    name:"end",
    data(){
		return {
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
  },
  methods:{
    },
});
</script>
