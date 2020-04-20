<template>
  <div id="app">
	  <datepicker v-model="value"></datepicker>
	  <!-- <date-pick v-model="time1" valueType="format"></date-pick> -->
	  <!-- <menus>
		  <sub-menu>
			  <template slot="title">标题</template>
			  <menu-item>content</menu-item>
			  <menu-item>
				   <sub-menu>
					  <template slot="title">标题</template>
					  <menu-item>content</menu-item>
					</sub-menu>  
			  </menu-item>
		  </sub-menu>
	  </menus> -->
  </div>
</template>

<script>
	import DatePick from 'vue2-datepicker';
	import 'vue2-datepicker/index.css';
	import 'vue2-datepicker/locale/zh-cn';
	  
	import datepicker from '@/components/datepicker';
	import menuItem from '@/components/menu-item.vue';
	import menus from '@/components/menu.vue';
	import subMenu from '@/components/sub-menu.vue';
	export default{
		components:{
			subMenu,
			menuItem,
			menus,
			DatePick,
			datepicker
		},
		data(){
			return{
				time1:null,
				value:new Date()
			}
		}
	}
</script>
<style lang="scss">
*{
	margin:0;
	padding:0;
	list-style:none;
}
#app{
	margin:20px;
}
</style>
