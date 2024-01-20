<template>
		<div class="loginUI">
			<div class="card">
				<div class="card-header">
					<h3>Login</h3>
					<span>Please enter your login details.</span>
				</div>
				<div class="card-body">
					<router-view>
						<div class="input-group">
							<input type="text" v-model="username">
							<label>Username</label>
						</div>
						<div class="input-group">
							<input type="text" v-model="role">
							<label>Role</label>
						</div>
						<button @click="login();">Login</button>
					</router-view>
				</div>
			</div>
		</div>
</template>
<script lang="ts">
import { getClient } from "./getClient";
import { defineComponent, nextTick } from "vue";
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
	name:"login",
	data() {
		return {
			username:'',
			role:'',
			client: getClient(),
	};
	},
	mounted(): void {
		// Connect at startup
		this.client.connect().then((v) => {
		if (!v.isSucc) {
			console.log("= Client Connect Error =\n" + v.errMsg);
		}
		});
	/*
		// Listen Msg
		this.client.listenMsg('Room', v => { 
			this.onRoomMsg(v);
	});
	*/
		// When disconnected
		/*
		this.client.flows.postDisconnectFlow.push((v) => {
		return v;
		});
		*/
	},

  methods:{
	async login():Promise<void> {
		let ret = await this.client.callApi('Login', {
			username:this.username,
			role:this.role,
		})
		if (ret.isSucc) {	
		//返回值： ret{isSucc,res}
			console.log(ret)
			const query = { username: this.username, role: this.role }
			this.$router.push({name:'room', query:query})
            this.client.disconnect();
		}
	},
},
})
</script>
<style scoped type= "text/css">
	body {
	background-color: #1e1e1e;
	}

	.loginUI {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	}

	.card {
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
	width: 400px;
	}

	.card-header {
	background-image: linear-gradient(to right, #e64b3b, #e08243);
	border-radius: 5px 5px 0 0;
	color: #fff;
	padding: 20px;
	text-align: center;
	}

	.card-header h3 {
	margin: 0;
	}

	.card-header span {
	display: block;
	font-size: 14px;
	margin-top: 10px;
	}

	.card-body {
	padding: 20px;
	}

	.input-group {
	display: flex;
	flex-direction: column-reverse;
	margin-bottom: 20px;
	position: relative;
	}

	.input-group input {
	border: none;
	border-bottom: 2px solid #ddd;
	font-size: 16px;
	padding: 10px 0;
	}

	.input-group input:focus {
	outline: none;
	}

	.input-group label {
	color: #999;
	font-size: 16px;
	position: absolute;
	pointer-events: none;
	top: 10px;
	left: 0;
	transition: all 0.2s ease-in-out;
	}

	.input-group input:focus + label,
	.input-group input:valid + label {
	font-size: 12px;
	top: -10px;
	color: #e64b3b;
	}

	button {
	background-image: linear-gradient(to right, #e64b3b, #e08243);
	border: none;
	border-radius: 5px;
	color: #fff;
	cursor: pointer;
	font-size: 16px;
	padding: 10px 20px;
	transition: all 0.2s ease-in-out;
	}

	button:hover {
	transform: translateY(-5px);
	}
</style>