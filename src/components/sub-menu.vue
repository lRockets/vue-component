<template>
	<div class="item">
		<div class="title" @click="show"><slot name="title"></slot></div>
		<div class="cont" v-if="isShow">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				isShow:true
			}
		},
		methods:{
			show(){
				this.isShow=!this.isShow;
			}
		}
	}
</script>

<style>
	.item{
		padding-left:15px;
	}
	.title{
		font-weight:bold;
		color:red;
	}
	.cont{
		padding-left:15px;
	}
</style>
