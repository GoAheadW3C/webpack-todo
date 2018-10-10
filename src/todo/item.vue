<template>
	<div id="todo-list">
		<div class="todo-item" v-for="item in list" v-if="list.length !== 0">
			<input type="checkbox" v-model="item.over" :id="item.id" :value="item.label" @change="changeCheckbox(item)">
			<span :class="{deleteLine:item.over}">{{item.label}}</span>
		</div>
		<div class="noData" v-if="list.length === 0">
			<img src="../assets/images/nodata.png" width="80px" height="80px">
			<span>暂无任务</span>
		</div>
	</div>
</template>

<script>
	export default {
		props:["taskContent","showItemsWord","clearFlag"],
		data(){
			return {
				list:[
					
				],
				copyList: [],
				filterlist: [],
				keyWord: 'all',
			}
		},
		watch:{
			taskContent(newVal,oldVal){				//添加新item
				this.list.push({
					id:this.maxListId(),
					label:newVal,
					over:false
				});
				this.copyList = this.list.slice();
				//重新计算未做完的长度
				let len = this.list.filter((item,index) => {
					return !item.over;
				}).length;
				this.$emit('leftItemLen',len);
			},
			showItemsWord(newVal,oldVal){
				this.list = this.filterItmes(newVal);
			},
			clearFlag(newVal,oldVal){
				this.copyList = this.copyList.filter((item,index) => {
					return !item.over;
				})
				this.list = this.filterItmes(this.keyWord);
			}
		},
		methods:{
			changeCheckbox(item){
				console.log(item);
				this.copyList.forEach((one,index) => {
					if(one.id === item.id){
						one.over = item.over;
					}
				})

				//重新计算未做完的长度
				let len = this.list.filter((item,index) => {
					return !item.over;
				}).length;
				this.$emit('leftItemLen',len);
			},
			maxListId(){
				let dealedList = this.list.map((item,index) => {
					return item.id;
				});
				if(dealedList.length === 0){
					return 0;
				}else{
					return dealedList.sort().reverse()[0]+1;
				}
			},
			filterItmes(keyWord){
				this.keyWord = keyWord;
				return this.copyList.filter((item,index) => {
					if(keyWord === 'all'){
						return true;
					}else if(keyWord === 'active'){
						return !item.over;
					}else{
						return item.over;
					}
				})	
			}
		},
		computed:{
			leftItemCount(){
				

			}
		}
	}
</script>

<style scoped>
	#todo-list{
		margin: 10px;
	}
	.todo-item{
		height: 30px;
		border: none;
		border-bottom: 1px solid #ccc;
		line-height: 35px;
		padding-left: 10px;
	}
	.noData{
		text-align: center;
		border-bottom: 1px solid #ccc;
	}
	.noData span{
		display: block;
		margin: 10px 0;
		color: #f9c032;
		opacity: .7;
	}
	.deleteLine{
		text-decoration: line-through;
		color: #dedede;
	}
	
</style>