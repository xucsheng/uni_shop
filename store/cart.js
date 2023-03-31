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
		 UPDATAGOODSSTATE(state,goods){
			 const findResult = state.cart.find(x=>x.goods_id === goods.goods_id);
			 if(findResult){
				 findResult.goods_state = goods.goods_state
				 //  通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
				 this.commit('m_cart/SAVETOSTORAGE');
			 }
		 },
		 UPDATEGOODSNUMBER(state,goods){
			 const findResult = state.cart.find(x=>x.goods_id === goods.goods_id);
			 if(findResult){
			 	findResult.goods_count = goods.goods_count
			  //  通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
			  this.commit('m_cart/SAVETOSTORAGE');
			 }
		 },
		 REMOVEGOODSBYID(state,goods){
			 const findResult = state.cart.filter(x=>x.goods_id !== goods.goods_id);
			 state.cart = findResult;
			 //  通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
			 this.commit('m_cart/SAVETOSTORAGE');
		 },
		 UPDATEALLGOODSSTATE(state,newState){
			 state.cart.forEach(item=>item.goods_state = newState);
			 //  通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
			 this.commit('m_cart/SAVETOSTORAGE');
		},
		
	 },
	 actions:{
		 // 添加购物车
		 addToCart({commit},goods){
	    	commit('ADDTOCART',goods);
		 },
		 // 更新购物车勾选状态
		 updateGoodsState({commit},goods){
			 commit('UPDATAGOODSSTATE',goods);
		 },
		 //  更新商品数量
		 updateGoodsNumber({commit},goods){
			  commit('UPDATEGOODSNUMBER',goods);
		 },
		 // 删除商品
		 removeGoodsById({commit},goods){
			 commit('REMOVEGOODSBYID',goods);
		 },
		 // 更新使用商品的勾选状态
		 updateAllGoodsState({commit},newState){
			 commit('UPDATEALLGOODSSTATE',newState);
			 
		 }
	},
	getters:{
		total(state){
			// let c = 0;
			// state.cart.forEach(x=>c+=x.goods_count);
			// return c;
			return state.cart.reduce((total,item)=>total+=item.goods_count,0);
		},
		checkedCount(state){
			return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total+=item.goods_count,0);
		},
		chechedAmount(state){
			return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total+=item.goods_count*item.goods_price,0).toFixed(2);
		}
		
		
	}
	
}