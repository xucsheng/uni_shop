<template>
	<view>
		<!--搜索组件-->
		<view class="search-box">
			<my-search @click="gotoSearch"></my-search>
		</view>
		
		<!--轮播图区域-->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(swiper,index) in swiperList" :key="swiper.goods_id">
				<navigator class="swiper-item" :url="`/subpackages/goods_detail/goods_detail?goods_id=${swiper.goods_id}`">
					<image :src="swiper.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
	
	   <!--分类导航区域-->
	  <view class="nav-list">
		  <view  class="nav-item"  v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
			<image :src="item.image_src" class="nav-img"></image>
		  </view>
	    </view>
		<!--楼层数据区域-->
		<view class="floor-list">
			<view   class="floor-item" v-for="(floor,index) in floorList" :key="index">
				<!--楼层的标题-->
				<image class="floor-title"  :src="floor.floor_title.image_src"></image>
				<!--楼层的图片区域-->
				<view class="floor-img-box">
					<!--左侧大盒子-->
					<navigator class="left-img-box" :url="floor.product_list[0].url">
						<image :src="floor.product_list[0].image_src" :style="{width:floor.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</navigator>
					<!--右侧4个小图片盒子-->
					<view class="right-img-box"  >
					 	<navigator class="rigth-img-item" :url="product.url"  v-for="(product,i) in floor.product_list" :key="i" v-if="i!=0">
						   <image  :src="product.image_src"  :style="{width:product.image_width+'rpx'}"  mode="widthFix" ></image>
					    </navigator>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 这是轮播图的数据列表
				swiperList:[],
				// 分类导航的数据列表
				navList:[],
				// 楼层的数据
				floorList:[],
			};
		},
		// 初始化生命周期函数
		onLoad() {
			this.getSwiperList();
			this.getNavList();
			this.getFloorList();
		},
		methods:{
			async getSwiperList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata');
				if(res.meta.status != 200){
			      return uni.$showMsg();
				}
				this.swiperList = res.message;
			},
			async getNavList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/catitems');
			     if(res.meta.status != 200){
			       return uni.$showMsg();
			     }
				 this.navList = res.message;
			},
			// 判断点击的是哪个 nav
			navClickHandler(item){
				if(item.name == '分类'){
				      uni.switchTab({
				      	url:'/pages/tabBar/cate/cate'
				      })
				}
			},
			// 获取首页楼层数据
			async getFloorList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
			    if(res.meta.status != 200){
			      return uni.$showMsg();
			    }
				// 对数据进行处理
				res.message.forEach(floor=>{
					floor.product_list.forEach(product=>{
						product.url ='/subpackages/goods_list/goods_list?'+product.navigator_url.split('?')[1];
					})
				})
				this.floorList = res.message;
			},
			gotoSearch(){
				uni.navigateTo({
					url:'/subpackages/search/search',
				   })
			}
		}
	}
</script>

<style lang="scss">
swiper{
	height: 330rpx;
	.swiper-item,
		image{
			width: 100%;
			height: 100%;
		}
}
.nav-list{
	display: flex;
	justify-content: space-around;
	margin: 15rpx 0;
}
.nav-img{
	width: 128rpx;
	height: 140rpx;
}
.floor-title{
	width: 100%;
	height: 60rpx;
}
.right-img-box{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
.floor-img-box{
	display: flex;
	padding: 10rpx;
}
.search-box{
	// 设置定位效果为“吸顶”
	position: sticky;
	// 吸顶的位置
	top: 0;
	// 提高吸顶，防止被轮播图覆盖
	z-index: 999;
}
</style>


