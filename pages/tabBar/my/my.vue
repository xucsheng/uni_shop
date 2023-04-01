<template>
	<view>
		<my-login v-if="!token"></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import bedgeMix from "@/mixinx/tabbar-badge.js"
	export default {
		mixins:[bedgeMix],
		computed:{
			...mapState('user',['token'])
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
