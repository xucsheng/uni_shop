<template>
	<view>
		<view class="search-box">
			<!-- 基本用法 -->
			<uni-search-bar  @input="input" :radius="100" cancelButton="none" ></uni-search-bar>
		</view>
		<!--搜索建议列表-->
		<view class="sugg-list" v-if="searchResults.length !==0">
			<view class="sugg-item" v-for="(item,index) in searchResults " :key="index" @click="gotoDetail(item)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!--搜索历史-->
		<view class="history-box" v-else>
			<!--标题区-->
			<view class="history-title">
				<tex>搜索历史</tex>
				<uni-icons type="trash" size="17" @click="clean"></uni-icons>
				
			</view>
			<!--历史区域-->
			<view class="hostory-list">
				<uni-tag :text="item" v-for="(item,index) in histories" :key="index" @click="gotoGoodsList(item)"></uni-tag>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				kw:null,
				// 搜索的结果列表
				searchResults:[],
				// 搜索历史记录
				historyList:[]
				
			};
		},
		onLoad(){
		   this.historyList = JSON.parse(uni.getStorageSync('kw')||'[]');
		},
		 methods:{
			 // input输入事件的处理函数
			 input(value){
				 clearTimeout(this.timer);
				 this.timer = setTimeout(()=>{
					  this.kw = value;
					  this.getSearchList();
				 },500);
				 
			 },
			async getSearchList(){
				 // 判断搜索关键词是否为空
				 if(this.kw.length === 0){
					 this.searchResults = [];
					 return;
				 }
				const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw});
			    // console.log(res);
				if(res.meta.status !==200){
					return uni.$showMsg();
				}
			    this.searchResults =  res.message;
				// 保存历史记录
				this.saveSearchHistory();
				
			 },
			 gotoDetail(item){
				 uni.navigateTo({
				 	url:'/subpackages/goods_detail/goods_detail?goods_id='+item.goods_id,
				 })
			 },
			 saveSearchHistory(){
				 //this.historyList.push(this.kw)
				 const set = new Set(this.historyList);
				 set.delete(this.kw);
				 set.add(this.kw);
				 this.historyList = Array.from(set);
				 // 对搜索历史数据进行持久化存储
				 uni.setStorageSync('kw',JSON.stringify(this.historyList));
			 },
			 clean(){
				  this.historyList =[];
				  uni.setStorageSync('kw','[]');
			 },
			 gotoGoodsList(kw){
				 uni.navigateTo({
				 	url:'/subpackages/goods_list/goods_list?query='+kw,
				 })
			 },
			 
		 },
		 computed:{
			 histories(){
				return  [...this.historyList].reverse();
			 }
		 },
	}
</script>

<style lang="scss">
.search-box {
	position: sticky;
	top:0;
	z-index: 999;
}
.sugg-list {
  padding: 0 5px;
	
  .sugg-item {
	font-size: 12px;
	padding: 13px 0;
	border-bottom: 1px solid #efefef;
    display: flex;
	align-items: center;
	justify-content: space-between;
	
    .goods-name {
	   // 文字不允许换行（单行文本）
	  white-space: nowrap;
	   // 溢出部分隐藏
	  overflow: hidden;
	   // 文本溢出后，使用 ... 代替
	  text-overflow: ellipsis;
	  
	  margin-right: 3px;
	  
     }
   }
}
.history-box { 
	padding: 0 5px ;
	
   .history-title {
	  display: flex;
	  justify-content: space-between;
	   
   }
   .hostory-list {
	    display: flex;
		flex-wrap: wrap;
	   
	   .uni-tag {
		 margin-top: 5px;
		 margin-right: 5px;
	   }
	   
   }
}


</style>
