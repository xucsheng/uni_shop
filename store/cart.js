export default{
	// 为当前模块开启命名空间
	 namespaced: true,
	 // 模块的state数量
	 state:()=>({
		 // 购物车的数组，用来存储购物车中每个商品的信息对象
		 // 每个商品的信息对象，都包含如下 6 个属性：
		 // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		 cart:JSON.parse(uni.getStorageSync('cart') || '[]')
		 
	 }),
	 // 模块的mutations
	 mutations:{
		 ADDTOCART(state,goods){
			const findResult = state.cart.find(x=>x.goods_id === goods.goods_id);
			if(!findResult){
				state.cart.push(goods);
			}else{
				findResult.goods_count++;
			}
			//  通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
			this.commit('m_cart/SAVETOSTORAGE');
			
		 },
		 SAVETOSTORAGE(state){
			 uni.setStorageSync('cart', JSON.stringify(state.cart));
		 },
		
	 },
	 actions:{
		 addToCart({commit},goods){
	    	commit('ADDTOCART',goods);
		 },
	},
	getters:{
		total(state){
			let c = 0;
			state.cart.forEach(x=>c+=x.goods_count);
			return c;
			
		}
		
	}
	
}