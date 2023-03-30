<template>
	<view>
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

</style>
