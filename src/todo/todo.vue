<template>
	<div id="todo-box">
		<input class="input-box todo-border-line" type="text" autofocus="autofocus" placeholder="接下去要做什么?" v-model="taskContent" @keydown.enter="addTask">
		<item 
			:taskContent="addTaskContent" 
			@leftItemLen="leftItemCount" 
			:showItemsWord="showItemsArea"
			:clearFlag="clearFlag"
		></item>
		<div class="count-box">
			<span class="left-count">{{leftItemNum}} items left</span>
			<span class="middle-operation">
				<button :class="{'border-red':isClicked === 'all'}" @click="showItemsFn('all')">all</button>
				<button :class="{'border-red':isClicked === 'active'}" @click="showItemsFn('active')">active</button>
				<button :class="{'border-red':isClicked === 'completed'}" @click="showItemsFn('completed')">completed</button>
			</span>
			<span class="right-clear">
				<button @click="clearCompletedItems">Clear completed</button>
			</span>
		</div>
	</div>
</template>

<script>
	import Item from './item.vue'
	export default {
		data(){
			return {
				taskContent:'',
				addTaskContent:'',
				leftItemNum:0,
				showItemsArea:'',//要显示的items的字段
				clearFlag:false,//该字段用于检测到其字段变化
				isClicked:'all'
			}
		},
		methods:{
			addTask(){
				if(this.taskContent === ''){
					return;
				}
				this.addTaskContent = this.taskContent;
				this.taskContent = '';
			},
			leftItemCount(value){
				this.leftItemNum = value;
			},
			showItemsFn(showArea){
				this.isClicked = showArea
				this.showItemsArea = showArea;
			},
			clearCompletedItems(){
				this.clearFlag = !this.clearFlag;
			}
		},
		components: {
			Item
		}
	}
</script>

<style scoped>
	#todo-box{
		width: 600px;
		min-height: 200px;
		background: white;
		margin: 0 auto;
		margin-bottom: 40px;
		padding: 10px;
		position: relative;
		z-index: 1000;
	}
	.input-box{
		width:100%;
		height: 40px;
		outline: none;
		padding-left: 20px;
		font-size: 24px;
		line-height: 40px;
		color: #ccc6c6;
	}
	.todo-border-line{
		border: none;
		border-bottom: 1px solid red;
	}
	.count-box{
		height: 40px;
		line-height: 40px;
		font-size: 15px;
	}
	.left-count{
		display: inline-block;
		width: 140px;
		text-align: center;
		font-size: 12px;
	}
	.middle-operation{
		display: inline-block;
		width: 270px;
		text-align: center;
	}
	.middle-operation button,.right-clear button{
		padding: 10px;
		border-radius: 4px;
		cursor: pointer;
		border: 1px solid rgba(0,0,0,0);
		outline: none;
	}
	.middle-operation button:hover,.right-clear button:hover{
		border:1px solid red;
	}
	.right-clear{
		display: inline-block;
		width: 160px;
		text-align: center;
	}
	.border-red{
		border:1px solid red!important;
	}
</style>