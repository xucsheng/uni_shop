<template>
	<view>
		 <!--选择收货地址的盒子-->
		 <view class="address-choose-box">
			 <button type="primary" size="mini" class="btnChooseAddress">请选择收货地址+</button>
		 </view>
		 <!--渲染收货信息的盒子-->
		 <view class="address-info-box">
			 <view class="row1">
				 <view class="row1-left">
					 <view class="username">收货人：ask</view>
				 </view>
				 <view class="row1-right">
					 <view class="phone">电话：<tex>138xxxxxxxx</tex></view>
					 <uni-icons type="right" size="16"></uni-icons>
				 </view>
			 </view>
			 <view class="row2">
				 <view class="row2-left">收货地址：</view>
				 <view class="row2-right">国有企业包括中央企业、省属企业、市属企业、县属企业等</view>
			 </view>
		 </view> 
		 
		 
		 <!--底部的边框线-->
		 <image src="/static/image/cart_border.jpg" class="address-border"></image>
	</view>
</template>

<script>
	export default {
		name:"my-address",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
.address-border{
	display: block;
	width: 100%;
	height: 5px;
}
.address-choose-box{
	height: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.address-info-box{
	font-size: 12px;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 5px;
	
	.row1{
		display: flex;
		justify-content: space-between;
		
		.row1-right{
			display: flex;
			justify-content: space-between;
			
			
			
		}
	}
	.row2{
		display: flex;
		align-items: center;
		margin-top: 10px;
		
		.row2-left{
			white-space: normal;
		}
		
		
	}
}
</style>