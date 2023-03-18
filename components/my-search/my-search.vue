<template>
	<view class="my-search-container":style="{'background-color':bgColor}" @click="searchBoxHandler">
		 <view class="my-search-box" :style="{'border-radius':radius+'px'}">
			 <!--使用uni-ui使用图标组件-->
			 <uni-icons type="search" size="17" ></uni-icons>
			  <text class="placeholder">搜索</text>
		 </view>
		
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props:{
			// 背景颜色
			bgColor:{
				type:String,
				default:'#C00000'
			},
			//  圆角尺寸
			radius:{
				type:Number,
				default:18 //px
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			searchBoxHandler(){
				//console.log('~~~~~');
				// 子父传参数，调用分类自定义事件
				this.$emit('click');
			}
		}
	}
</script>

<style lang="scss">
.my-search-container{
	height: 50px;
	//background-color: #C00000;
	display: flex;
	align-items: center;
	padding: 0 10px;
}
	.my-search-box{
		height: 36px;
		background: #FFFFFF;
		//border-radius: 15px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.placeholder{
			font-size: 15px;
			margin-left: 5px;
		}
	}
		
</style>