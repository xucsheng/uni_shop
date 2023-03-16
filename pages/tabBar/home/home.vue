<template>
	<view>
		<!--轮播图区域-->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(swiper,index) in swiperList" :key="swiper.goods_id">
				<view class="swiper-item">
					<img :src="swiper.image_src">
				</view>
			</swiper-item>
			
		</swiper>
		
</template>

<script>
	export default {
		data() {
			return {
				// 这是轮播图的数据列表
				swiperList:[],
				
			};
		},
		// 初始化生命周期函数
		onLoad() {
			this.getSwiperList();
		},
		methods:{
			async getSwiperList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata');
				if(res.meta.status != 200){
					return uni.showToast({
						title:'数据请求失败！',
						duration:1500,
						 icon:'none'
					})
				}
				this.swiperList = res.message;
				 
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

</style>


