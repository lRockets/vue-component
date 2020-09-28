<template>
	<div>
		<div>我是子组件</div>
		 <ab></ab>
	</div>
</template>

<script>
	import ab from '@/components/ab.vue';
	export default{
		name:'hello',
		components:{
			ab
		},
		methods:{
			init(){
				console.log(1111111111111111111111);
			}
		}
	}
</script>

<style>
</style>
