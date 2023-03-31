<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<!--收货地址组件-->
		<my-address></my-address>
		<!--商品列表标题区域-->
		<view class="cart-title">
			<!--左侧的图标-->
	         <uni-icons type="shop" size="18"></uni-icons>
		
			<!--右侧的文本-->
			<text class="cart-title-text">购物车</text>
		</view>
		<!--循环渲染购物车的商品信息-->
		<!-- uni-swipe-action 是最外层包裹性质的容器 -->
        <uni-swipe-action>
			<block v-for="(goods,index) in cart" :key="index">
			    <uni-swipe-action-item  :right-options="options" @click="swipeItemHandler(goods)"  :show="isOpened" :auto-close="false">
				    <my-goods :goods="goods" :show-radio="true" @num-changer="numChangerHandler"   @radio-changer="radioChangeHandler" :show-number="true"></my-goods>
			     </uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		<!--使用结算组件-->
		<my-settle></my-settle>
	</view>
     <!--空白购物车节点-->
	 <view class="empty-cart" v-else>
		 <image src="/static/image/cart-empty.png" class="empty-img"></image>
		 <text class="tip-text">空空如也~~~</text>
	 </view>
</template>

<script>
import bedgeMix from "@/mixinx/tabbar-badge.js";
import {mapState,mapActions} from 'vuex';

	export default {
		mixins:[bedgeMix],
		computed:{
			...mapState('m_cart',['cart']),
		},
		data() {
			return {
				options:[{
					text:'删除',
					style:{
						backgroundColor:'#c00000'
					}
				}]
					
				
			}
		},
		methods: {
			...mapActions('m_cart',['updateGoodsState','updateGoodsNumber','removeGoodsById']),
			radioChangeHandler(e){
				this.updateGoodsState(e);
			},
			// 更新商品数量
			numChangerHandler(e){
				this.updateGoodsNumber(e)
			},
			swipeItemHandler(goods){
				this.removeGoodsById(goods);
			}
		}
	}
</script>

<style lang="less">
	.cart-container{
		padding-bottom: 50px;
	}
	.cart-title{
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;
		
		.cart-title-text{
			font-size: 14px;
			margin-left: 10px;
			
		}
		
	}
.empty-cart{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 150px;
	.empty-img{
		width: 90px;
		height: 90px;
	}
	.tip-text{
		font-size: 12px;
		color: gray;
		margin-top: 15px;
		
	}
}
</style>
