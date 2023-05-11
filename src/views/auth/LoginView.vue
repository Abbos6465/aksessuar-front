<template>
	<div class="login bg-white rounded-2">	
		<form @submit.prevent>
			<h4 class="text-center text-primary">
				olma.uz
			</h4>
			<h1 class="mb-3 fw-bold text-center text-primary mb-5">Kirish</h1>
		<ErrorList v-if="this.errors && this.errorPage=='Login'" :errors="this.errors"/>
			<Input :type="'text'" :label="'username'" v-model="this.username" />
			<Input :type="'password'" :label="'Password'" v-model="this.password" />
			<div class="d-flex mt-4 justify-content-between align-items-center">
				<RouterLink :to="{name:'Register'}">Ro'yxatdan o'tish</RouterLink>
				<Button class="w-25" :isLoading="isLoading" @click="authLogin">
					<div v-if="isLoading" class="spinner-border" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
					<span v-else>Kirish</span>
				</Button>
			</div>
		</form>
	</div>
</template>
<script>
import Input from "@/components/UI/Input.vue";
import Button from "@/components/UI/Button.vue";
import ErrorList from "@/components/ErrorList.vue";

import { mapActions,mapState } from "vuex";
export default {
	name:"LoginView",
	components:{ Input, Button,ErrorList},

	computed:{
		...mapState({
			isLoading: state => state.auth.isLoading,
			errors: state => state.auth.errors,
			errorPage: state => state.auth.errorPage
		})
	},

	data() {
		return {
			usename:"",
			password:""
		}
	},

	methods: {
		...mapActions({
			login: 'auth/login'
		}),
		
		authLogin(){
			let data={
				username:this.username,
				password:this.password
			}

			this.login(data)
			.then((res)=> {
				this.$router.push({name:"Home"});
			})
			.catch(err=>{
				console.log(error);
			})
		}
	},
}
</script>
<style scoped>
.login {
	padding:20px;
	width: 500px;
	min-height: 400px;
	webkit-box-shadow: 25px 16px 67px 69px rgba(34, 60, 80, 0.37);
	-moz-box-shadow: 25px 16px 67px 69px rgba(34, 60, 80, 0.37);
	box-shadow: 25px 16px 67px 69px rgba(34, 60, 80, 0.37);
}
</style>