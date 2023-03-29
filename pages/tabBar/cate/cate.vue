<template>
	<view>
		<!--自定义的搜索组件-->
		<!-- <my-search :bgColor="'pink'" :radius="3"></my-search>-->
		<my-search @click="gotoSearch"></my-search>
		<view class="scroll-view-container">
			<!--左侧滑动区域-->
			<scroll-view class="left-scroll-view"   scroll-y :style="{height: wh + 'px'}">
				<block v-for="(item,index) in cateList" :key="index">
				   <view   :class="['left-scroll-view-item', index === active ? 'active' :'']"  @click="activeChanged(index)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!--右侧滑动区域-->
			<scroll-view class="right-scroll-view"   :scroll-top="scrollTop"  scroll-y :style="{height: wh + 'px'}">
				<view class="cate-lv2"  v-for="(item2,index) in cateLevel2" :key="index">
					<!--二级分类标题-->
					<view class="cate-lv2-title">/{{item2.cat_name}}/</view>
					<!--动态渲染三级分类的类别数据-->
					<view class="cate-lv3-list">
						<!--三级分类的item项-->
						<view class="cate-lv3-item" v-for="(cateLevel3,i) in item2.children" :key="i" @click="gotoGoodsList(cateLevel3)">
							<!--三级分类的图片-->
							<image :src="cateLevel3.cat_icon.replace('dev','web')"></image>
							<!--三级分类的文本-->
							<text>{{cateLevel3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import bedgeMix from "@/mixinx/tabbar-badge.js"
	export default {
		mixins:[bedgeMix],
		data() {
			return {
				// 当前设备可使用的高度
				wh:0,
				// 分类数据
				cateList:[],
				active:0,
				// 二级分类列表
			    cateLevel2: [],
				// 滑动滚轮定位坐标
				scrollTop:0
			}
		},
		onLoad(){
			// 获取当前系统的信息
			const sysInfo = uni.getSystemInfoSync();
			//console.log(sysInfo);
			// 为 wh 窗口可用高度动态赋值 50是搜索页面大小
			this.wh = sysInfo.windowHeight-50;
			this.getCateList();
			
		},
		methods: {
			async getCateList(){
				const {data:res}  = await uni.$http.get('/api/public/v1/categories');
				if(res.meta.status !=200){
					return uni.$showMsg();
				}
				this.cateList = res.message;
				// 为二级分类赋值
				this.cateLevel2 = res.message[0].children
			},
			activeChanged(index){
				this.active = index;
				// 重新为二级分类赋值
				this.cateLevel2 = this.cateList[index].children;
				this.scrollTop = this.scrollTop === 0 ? 1: 0;
			},
			// 调转到三级页面
			gotoGoodsList(cateLevel3){
				uni.navigateTo({
					url:'/subpackages/goods_list/goods_list?cid='+cateLevel3.cat_id,
				})
				
			},
			// 跳转到搜索页面
			gotoSearch(){
				uni.navigateTo({
					url:'/subpackages/search/search',
				   })
			}
		}
	}
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 120px;

    .left-scroll-view-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;

      // 激活项的样式
      &.active {
        background-color: #ffffff;
        position: relative;

        // 渲染激活项左侧的红色指示边线
        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
.cate-lv2-title{
	font-size: 12px;
	font-weight: bold;
	text-align: center;
	padding: 15px 0;
}
.cate-lv3-list {
  display: flex;
  flex-wrap: wrap;
  
   .cate-lv3-item{
	width: 33.33%;
	margin-bottom: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 10px;
	image{
	  width: 60px;
	  height: 60px;
	}
	text{
	  font-size: 12px;
	 }
   }
}
</style>
