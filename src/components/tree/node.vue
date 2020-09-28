<template>
	<ul>
		<li v-for="(item,index) in data" :key="index">
			<template v-if="checkbox">
				<input type="checkbox">
			</template>
			<div class="tree_title">{{item.title}}</div>
			<TreeNode 
				v-if="item.children"
				v-for="(data, i) in item.children"
				:key="i"
				:checkbox="checkbox" 
				:data="item.children">
			</TreeNode>
		</li>
	</ul>
</template>

<script>
	export default{
		name:'TreeNode',
		props:{
			data:Array,
			checkbox:Boolean
		}
	}
</script>

<style scoped>
	li{
		padding-left:20px;
	}
	.tree_title{
		display: inline-block;
		vertical-align: middle;
		font-size:16px;
		margin-left:5px;
	}
</style>
