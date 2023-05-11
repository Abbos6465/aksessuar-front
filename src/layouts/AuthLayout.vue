<template>
	<div class="auth-layout">
		<RouterView />
	</div>
</template>

<script>
export default {
	name: 'AuthLayout'
}
</script>

<style>
.auth-layout {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background: rgb(131, 58, 180);
	background: linear-gradient(90deg, rgba(131, 58, 180, 1) 0%, rgba(134, 29, 253, 1) 50%, rgba(69, 232, 252, 0.4009978991596639) 100%);
}
</style>
