<template>
	<view class="my-settle-container">
		<!--全选-->
		<label class="radio" @click="changeAllState">
		     <radio color="#C00000" :checked="isFullCheck"  /><text>全选</text>
		</label>
		<!--合计-->
		<view class="amount-box">
			合计：<text class="amount">￥{{chechedAmount}}</text>
		</view>
		
		<!--结算按钮-->
		<view class="btn-settle" @click="settlement">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapActions,mapState} from 'vuex'
	export default {
		name:"my-settle",
		computed:{
			...mapGetters('cart',['checkedCount','total','chechedAmount','']),
		   ...mapGetters('user',['addstr']),
		   ...mapState('user',['token']),
		   ...mapState('cart',['cart']),
			isFullCheck(){
				return this.checkedCount === this.total;
			},
		},
		data() {
			return {
				// 倒计时的描述
				seconds:3,
				// 定时器的Id
				timer:null,
			};
		},
		methods:{
			...mapActions('cart',['updateAllGoodsState']),
			...mapActions('user',['updateRedirectInfo']),
			changeAllState(){
				this.updateAllGoodsState(!this.isFullCheck);
			},
			// 用户点击结算按钮
			settlement(){
				if(!this.checkedCount){
					return uni.$showMsg('请选择要结算的商品！');
				}
				if(!this.addstr){
					return uni.$showMsg('请选择收货地址！');
				}
				// if(!this.token){
				// 	return uni.$showMsg('请先登录！');
				// }
				if(!this.token){
					return  this.delayNavigate();
				}
				this.payOrder();
				
			},
			// 微信支付
			async payOrder(){
				// 1.1 组织订单
				const orderInfo ={
					// order_price:this.chechedAmount,
					order_price:0.01,
					consignee_addr:this.addstr,
				    goods: this.cart.filter(x => x.goods_state).map(x => ({
						goods_id: x.goods_id,
						 goods_number: x.goods_count, 
						 goods_price: x.goods_price,
						 }))
				  };
				 
				
				// 1.2 发起请求创建订单
				const {data:res}  = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo);
				
				if(res.meta.status !==401){
					return uni.$showMsg('创建订单失败！');
				}
				// 1.3 得到服务器响应的订单编号
				const orderNumber = res.message||'402'||res.message.order_number ;
				// 2.1 发起请求获取订单的支付信息
				const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber });
				// 2.2 预付款订单生产失败
				if(res2.meta.status !==401){
					return uni.$showMsg('预付订单失败！');
				}
				// 2.3 得到订单支付相关的必要参数
				const payInfo = res2.message||{}||res2.message.pay;
				// 3.发起微信支付
				connst [err,succ] = await  uni.requestPayment(payInfo);
				if(err){
					return uni.$showMsg('订单未支付！');
				}
				 const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
				// 3.4 检测到订单未支付
				if (res3.meta.status !== 200){
					return uni.$showMsg('订单未支付！');
				} 
				 // 3.5 检测到订单支付完成
				 uni.showToast({
				     title: '支付完成！',
				     icon: 'success'
				   })
			},
			// 展示倒计时的提示消息
			showTips(n){
				uni.showToast({
					icon:'none',
					title:'请登录后再结算！'+n+'秒以后自动跳转到登录页',
					mask:true,
					// 1.5 秒后自动消失
					duration:1500
				})
			},
			// 延迟导航到my页面
			delayNavigate(){
				// 重置定时器时间
				this.seconds = 3;
				this.showTips(this.seconds);
				this.timer = setInterval(()=>{
					this.seconds--;
					if(this.seconds <= 0){
						clearInterval(this.timer);
						uni.switchTab({
							url:'/pages/tabBar/my/my',
							success: () => {
								this.updateRedirectInfo({
									openType :'switchTab',
									from :'/pages/tabBar/cart/cart'
								})
							}
						})
						return;
					}
					this.showTips(this.seconds);
				},1000)
			}
		}
	}
</script>

<style lang="less">
	.my-settle-container{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		
		.radion{
			display: flex;
			align-items: center;
		}
		.amount-box{
			.amount{
				color: #C00000;
				font-weight: bold;
			}
			
		}
		.btn-settle{
			background-color: #C00000;
			height: 50px;
			color: white;
			line-height: 50px;
			padding: 0 10px;
			min-width: 100px;
			text-align: center;
		}
	}

</style>