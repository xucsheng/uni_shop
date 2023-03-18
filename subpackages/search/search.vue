<template>
	<view>
		<view class="search-box">
			<!-- 基本用法 -->
			<uni-search-bar  @input="input" :radius="100" cancelButton="none" ></uni-search-bar>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				kw:null,
				
			};
		},
		 methods:{
			 // input输入事件的处理函数
			 input(value){
				 clearTimeout(this.timer);
				 this.timer = setTimeout(()=>{
					  this.kw = value;
				 },500);
				 
			 }
		 }
	}
</script>

<style lang="scss">
.search-box{
	position: sticky;
	top:0;
	z-index: 999;
}

</style>
