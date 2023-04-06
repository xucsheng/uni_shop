
export default {
  // 为当前模块开启命名空间
   namespaced: true,
	state: {
		hasLogin: false,
		isUniverifyLogin: false,
		loginProvider: "",
		openid: null,
		testvuex: false,
		colorIndex: 0,
		colorList: ['#FF0000', '#00FF00', '#0000FF'],
		noMatchLeftWindow: true,
		active: 'componentPage',
		leftWinActive: '/pages/component/view/view',
		activeOpen: '',
		menu: [],
		univerifyErrorMsg: '',
		address: JSON.parse(uni.getStorageSync('address')|| '{}') ,
		token: uni.getStorageSync('token') || '',
		// 用户信息对象
		userinfo : JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		// 重定向Object对象
		redirectInfo: null,
		
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.loginProvider = provider;
		},
		logout(state) {
			state.hasLogin = false
			state.openid = null
		},
		setOpenid(state, openid) {
			state.openid = openid
		},
		setTestTrue(state) {
			state.testvuex = true
		},
		setTestFalse(state) {
			state.testvuex = false
		},
		setColorIndex(state, index) {
			state.colorIndex = index
		},
		setMatchLeftWindow(state, matchLeftWindow) {
			state.noMatchLeftWindow = !matchLeftWindow
		},
		setActive(state, tabPage) {
			state.active = tabPage
		},
		setLeftWinActive(state, leftWinActive) {
			state.leftWinActive = leftWinActive
		},
		setActiveOpen(state, activeOpen) {
			state.activeOpen = activeOpen
		},
		setMenu(state, menu) {
			state.menu = menu
		},
		setUniverifyLogin(state, payload) {
			typeof payload !== 'boolean' ? payload = !!payload : '';
			state.isUniverifyLogin = payload;
		},
		setUniverifyErrorMsg(state,payload = ''){
			state.univerifyErrorMsg = payload
		},
		UPDATEADDRESS(state,address){
			state.address = address;
			this.commit('user/SAVEADDRESSTOSTORAGE');
		},
		// 持久化收货地址
		SAVEADDRESSTOSTORAGE(state){
			uni.setStorageSync('address',JSON.stringify(state.address));
		},
		UPDATEUSERINFO(state,userinfo){
			state.userinfo = userinfo;
			this.commit('user/SAVEUSERINFOSTORAGE');
		},
		SAVEUSERINFOSTORAGE(state){
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo));
		},
		UPDATETOKEN(state,token){
			state.token = token;
			this.commit('user/SAVETOKENTOSTORAGE');
		},
		SAVETOKENTOSTORAGE(state){
			uni.setStorageSync('token',state.token);
		},
		UPDATEREDIRECTINFO(state,redirectInfo){
			state.redirectInfo = redirectInfo;
		}
		
	},
	
	actions: {
		// lazy loading openid
		getUserOpenId: async function({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function() { //模拟异步请求服务器获取 openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid + ']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		},
		getPhoneNumber: function({
			commit
		}, univerifyInfo) {
			return new Promise((resolve, reject) => {
				uni.request({
					url: 'https://97fca9f2-41f6-449f-a35e-3f135d4c3875.bspapp.com/http/univerify-login',
					method: 'POST',
					data: univerifyInfo,
					success: (res) => {
						const data = res.data
						if (data.success) {
							resolve(data.phoneNumber)
						} else {
							reject(res)
						}

					},
					fail: (err) => {
						reject(res)
					}
				})
			})
		},
		updateAddress({commit},address){
			commit('UPDATEADDRESS',address);
		},
		updateUserInfo({commit},userinfo){
			commit('UPDATEUSERINFO',userinfo);
		},
		updateToken({commit},token){
			commit('UPDATETOKEN',token);
		},
		updateRedirectInfo({commit},redirectInfo){
			commit('UPDATEREDIRECTINFO',redirectInfo);
			
		}
	},
	getters: {
		currentColor(state) {
			return state.colorList[state.colorIndex]
		},
		addstr(state){
			if(state.address.provinceName === ''){
				return '';
			}else{
				return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo;
			}
		}
	},
}