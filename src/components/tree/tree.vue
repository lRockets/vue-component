<template>
	<div>
		<TreeNode checkbox :data="data6"></TreeNode>
	</div>
</template>

<script>
	import TreeNode from './node'
	export default{
		components:{
			TreeNode
		},
		data(){
			return{
				data6: [
					{
						title: 'parent 1',
						expand: true,
						contextmenu: true,
						children: [
							{
								title: 'parent 1-1',
								expand: true,
								contextmenu: true,
								children: [
									{
										title: 'leaf 1-1-1',
										contextmenu: true
									},
									{
										title: 'leaf 1-1-2',
										contextmenu: true
									}
								]
							},
							{
								title: 'parent 1-2',
								expand: true,
								contextmenu: true,
								children: [
									{
										title: 'leaf 1-2-1',
										contextmenu: true
									},
									{
										title: 'leaf 1-2-1',
										contextmenu: true
									}
								]
							}
						]
					}
				]
			}
		}
	}
</script>

<style>
</style>
