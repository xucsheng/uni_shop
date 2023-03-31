<template>
	
		<view class="goods-item">
			<!--左侧的盒子-->
		    <view class="goods-item-left">
				<radio  :checked="goods.goods_state"  @click="radioClickHandler"    color="#C00000" v-if="showRadio"></radio>
				<image  class="goods-pic" :src="goods.goods_small_logo||defaultPic"></image>
			</view>
		    <!--右侧的盒子-->
		    <view class="goods-item-right">
				<!--商品名称-->
				<view class="goods-name">
					{{goods.goods_name}}
				 </view>
				<view class="goods-info-box">
					 <!-- 商品价格 -->
					<view class="goods-price"> ￥{{goods.goods_price | tofixed}}</view>
					<!-- 商品数量 -->
					  <uni-number-box :min="1" :value="goods.goods_count" v-if="showNumber" @change="numChangeHandler"></uni-number-box>		
					</view>		 
			 </view>
		</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
            goods:{
				type:Object,
				default:{}
			},
			// 是否显示图片左侧radio
			showRadio:{
				type:Boolean,
				// 默认情况下，不会显示radio显示
				default:false
			},
			showNumber:{
				type:Boolean,
				// 默认情况下，不会显示number显示
				default:false
			},
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2);
			}
			
		},
		data() {
			return {
				// 默认的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		methods:{
			// 这是radio组件的点击事件的处理函数
			radioClickHandler(){
				this.$emit('radio-changer',{
					goods_id:this.goods.goods_id,
					goods_state:!this.goods.goods_state
				})
			},
			numChangeHandler(val){
				this.$emit('num-changer',{
					goods_id:this.goods.goods_id,
					goods_count:+val
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item{
		width: 750rpx;
		box-sizing: border-box;
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
		
		.goods-item-left{
			margin-right: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.goods-pic{
				width: 100px;
				height: 100px;
				display: block;
				
				
			}
		}
		.goods-item-right{
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-around;
			
			.goods-name{
				font-size: 13px;
				
			}
			.goods-info-box{
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				.goods-price{
					color: #c00000;
					font-size: 16px;
					
				}
			}
		}
		
		
	}
	

</style>