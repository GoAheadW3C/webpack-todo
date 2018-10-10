<template>
	<div id="todoApp">
		<div class="shadow-box"></div>
		<Header></Header>
		<todo></todo>
		<Footer></Footer>
	</div>
</template>

<script>
	import Header from './todo/header.vue'
	import Footer from './todo/footer.vue'
	import Todo from './todo/todo.vue'
	export default {
		data(){
			return {

			}
		},
		components: {
			Header,
			Footer,
			Todo
		}
	}
</script>

<style scoped>
	#todoApp{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background: url(./assets/images/bg.jpeg) no-repeat;
		background-size: cover;

	}
	.shadow-box{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background: white;
		opacity: .7;
	}
</style>