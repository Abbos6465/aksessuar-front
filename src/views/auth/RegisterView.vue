<template>
	<div class="login bg-white rounded-2">
		<form @submit.prevent>
			<h4 class="text-center text-primary">
				olma.uz
			</h4>
			<h1 class="mb-3 fw-bold text-center text-primary mb-5">Ro'yxatdan o'tish</h1>
			<ErrorList v-if="this.errors && this.errorPage == 'Register'" :errors="this.errors" />

			<Input :type="'text'" :label="'username'" v-model="this.username" />
			<Input :type="'email'" :label="'Email'" v-model="this.email" />
			<Input :type="'password'" :label="'Password'" v-model="this.password" />
			<div class="d-flex mt-4 align-items-center justify-content-between">
				<RouterLink :to="{ name: 'Login' }">Kirish</RouterLink>

				<Button class="w-50" :isLoading="isLoading" @click="authRegister">
					<div v-if="isLoading" class="spinner-border" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
					<span v-else>Ro'yhatdan o'tish</span>
				</Button>
			</div>
		</form>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import Input from "@/components/UI/Input.vue";
import Button from "@/components/UI/Button.vue";
import ErrorList from "@/components/ErrorList.vue";

export default {
	name: "RegisterView",
	components: { Input, Button, ErrorList },
	data() {
		return {
			username: "",
			email: "",
			password: ""
		}
	},

	computed: {
		...mapState({
			isLoading: state => state.auth.isLoading,
			errors: state => state.auth.errors,
			errorPage: state => state.auth.errorPage
		})
	},

	methods: {

		...mapActions({
			register: 'auth/register'
		}),


		authRegister() {
			const data = {
				username: this.username,
				email: this.email,
				password: this.password
			}
			this.register(data)
				.then(data => {
					this.$router.push({ name: "Home" });
				})
				.catch(error => {
					console.log(error);
				});
		}
	},
}
</script>
<style scoped>
.login {
	padding: 20px;
	width: 500px;
	min-height: 400px;
	webkit-box-shadow: 25px 16px 67px 69px rgba(34, 60, 80, 0.37);
	-moz-box-shadow: 25px 16px 67px 69px rgba(34, 60, 80, 0.37);
	box-shadow: 25px 16px 67px 69px rgba(34, 60, 80, 0.37);
}
</style>