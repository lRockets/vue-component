<template>
	<div>我是孙子组件</div>
</template>

<script>
	export default{
		name:'ab',
		data(){
			return{
				a:111
			}
		},
		methods:{
			init(){
				console.log('我是init方法')
			}
		}
	}
</script>

<style>
</style>
