<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		<text class="tips-text">登录后尽享更多权益</text>
	</view>
</template>

<script>
	import{mapActions} from 'vuex'
	export default {
		name:"my-login",
		computed:{
		},
		data() {
			return {
				
			};
		},
		methods:{
			...mapActions('user',['updateUserInfo']),
			// 获取用户基本信息
			getUserInfo(e){
				if (e.detail.errMsg === 'getUserInfo:fail auth deny'){
					return uni.$showMsg('您取消了授权');
				}
				this.updateUserInfo(e.detail.userInfo);
				this.getToken(e.detail);
			},
			async getToken(info){
				// 获取code对应的值
				const[err,res] =await uni.login().catch(err=>err);
				if(err || res.errMsg !=='login:ok'){
					return uni.$showMsg('登录失败');
				}
				// 准备参数
				const query ={
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				console.log(query);
				//const {data:loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin',query);
				//console.log(loginResult);
				//if(loginResult.meta.status!==200){
				//	return uni.$showMsg('登录失败！');
				//}
				//uni.$showMsg('登录成功！');
			}
		}
	}
</script>

<style lang="less">
	.login-container{
		height: 750rpx;
		background-color:  #F8F8F8;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;
		
		 &::after{
			 content: ' ';
			 display: block;
			 width: 100%;
			 height: 40px;
			 background-color: white;
			 position: absolute;
			 bottom: 0;
			 left: 0;
			 border-radius: 100%;
			 transform: translateY(50%);
		 }
		
		.btn-login{
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #C00000;
		}
		.tips-text{
			color: gray;
			font-size: 12px;
			
		}
		
	}

</style>