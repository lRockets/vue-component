<template>
	<div v-click-outSlide="blur" style="position:relative;">
		<div class="input">
			<input type="text" @focus="focus" :value="formatDate">
		</div>
		<div class="pannel" v-if="show">
			<div class="pannel-nav">
				<span @click="prevMonth"> &lt; </span>
				<span  @click="prevYear"> &lt;&lt; </span>
				<span>{{time.year}}年</span>
				<span>{{time.month}}月</span>
				<span @click="nextYear"> &gt;&gt; </span>
				<span @click="nextMonth"> &gt; </span>
			</div>
			<div class="pannel-content">
				<div class="weeks">
					
					<span class="week" v-for="item in WEEKS" :key="item">{{item}}</span>
				</div>
				<div class="days">
					<div v-for="i in 6" :key="i">
						<span @click="selectDate(visibleDays[(i-1)*7+(item-1)])" v-for="item in 7" :key="item" 
						:class="['date',
							{
								'notCurrent':!isCurrent(visibleDays[(i-1)*7+(item-1)]), 
								'today':isToday(visibleDays[(i-1)*7+(item-1)]),
								'current':current(visibleDays[(i-1)*7+(item-1)])
							}
						]">
							{{visibleDays[(i-1)*7+(item-1)].getDate()}}
						</span>
					</div>
				</div>	
			</div>
			<div class="pannel-footer" @click="toToday">今天</div>
		</div>
	</div>
</template>

<script>
	import * as utils from '@/utils.js';
	const WEEKS = ['日', '一', '二', '三', '四', '五', '六'];
	export default{
		props:{
			value:{
				type:[Date],
				default:()=>new Date()
			},
			firstDayOfWeek:{
				type:Number,
				default:7
			},
			showClose:{
				type:Boolean,
				default:true
			}
		},
		directives:{
			'click-outSlide':{
				bind(el,binding){
					el.__handlerClick__=function(e){
						if(e.target === el || el.contains(e.target)){
							return;
						}
						binding.value();
					};
					document.addEventListener('click',el.__handlerClick__,false);
				},
				unbind(el){
					document.removeEventListener('click',el.__handlerClick__,false);
					delete el.__handlerClick__;
				}
			}
		},
		computed:{
			WEEKS() {
			  const week = this.firstDayOfWeek;
			  return WEEKS.concat(WEEKS).slice(week, week + 7);
			},
			offsetDay() {
			  const week = this.firstDayOfWeek;
			  // 周日为界限，左右偏移的天数，3217654 例如周一就是 -1，目的是调整前两行日期的位置
			  return week > 3 ? 7 - week : -week;
			},
			formatDate(){
				let {year,month,day}=utils.getYearMonthDay(this.value);
				return `${year}-${month+1}-${day}`;
			},
			visibleDays(){ // 计算当前是周几
				let {year,month,day}=utils.getYearMonthDay(new Date(this.time.year,this.time.month-1,1));
				let currentFirstDay=utils.getDate(year,month,1); //获取当前月份的第一天
				let week=currentFirstDay.getDay();	//第一天星期几
				let startDay=currentFirstDay-(week-this.offsetDay)*60*60*1000*24; //开始天数
				let arr=[];
				for(var i=0;i<42;i++){
					arr.push(new Date(startDay+i*60*60*1000*24))
				}
				return arr;
			}
		},
		data(){
			let {year,month}=utils.getYearMonthDay(this.value);
			return{
				show:false,
				time:{year:year,month:month+1}
			}
		},
		methods:{
			isCurrent(date){ // 当前value的年月 跟传入的日期年月对比  如果相等 则是当前
				let {year,month}=utils.getYearMonthDay(new Date(this.time.year,this.time.month-1,1));
				let {year:y,month:m}=utils.getYearMonthDay(date);
				return year == y && month == m;
			},
			current(date){
				let {year,month,day}=utils.getYearMonthDay(this.value);
				let {year:y,month:m,day:d}=utils.getYearMonthDay(date);
				return year == y && month == m && day==d;
			},
			selectDate(date){
				this.$emit('input',date);
				
				let {year:y,month:m}=utils.getYearMonthDay(date);
				this.time.year=y;
				this.time.month=m+1;
				console.log(this.time)
				this.blur();
			},
			toToday(){
				this.$emit('input',new Date());
				this.blur();
			},
			isToday(date){
				let {year,month,day}=utils.getYearMonthDay(date);
				let {year:y,month:m,day:d}=utils.getYearMonthDay(new Date());
				return year == y && month == m && day==d;
			},
			prevYear(){
				let cur=utils.getDate(this.time.year,this.time.month-1,1);
				let n=new Date(cur.setFullYear(cur.getFullYear()-1));
				this.time.month=n.getMonth()+1;
				this.time.year=n.getFullYear();
			},
			nextYear(){
				let cur=utils.getDate(this.time.year,this.time.month-1,1);
				let n=new Date(cur.setFullYear(cur.getFullYear()+1));
				this.time.month=n.getMonth()+1;
				this.time.year=n.getFullYear();
			},
			prevMonth(){
				let cur=utils.getDate(this.time.year,this.time.month-1,1);
				let n=new Date(cur.setMonth(cur.getMonth()-1));
				this.time.month=n.getMonth()+1;
				this.time.year=n.getFullYear();
			},
			nextMonth(){
				let cur=utils.getDate(this.time.year,this.time.month-1,1);
				let n=new Date(cur.setMonth(cur.getMonth()+1));
				this.time.month=n.getMonth()+1;
				this.time.year=n.getFullYear();
			},
			focus(){
				this.show=true;
			},
			blur(){
				this.show=false;
			}
		}
	}
</script>

<style lang="scss">
	.pannel{
		position:absolute;
		left:0;
		top:30px;
		bakcground:#fff;
		width:200px;
		box-shadow: 0 0 10px #ccc;
		text-align: center;
	}
	.input{
		position:relative;
		display: inline-block;
		.showClose{
			position:absolute;
			right:10px;
			top:50%;
			cursor:pointer;
			transform:translateY(-50%);
		}
	}
	.pannel-content{
		margin-top:10px;
	}
	.date:hover{
		color:#409eff;
	}
	
	.date,.week{
		width:24px;
		height:24px;
		text-align: center;
		display: inline-block;
		vertical-align: middle;
		margin:2px;
		font-size:12px;
		color:#454545;
		cursor:pointer;
		line-height: 24px;
		&.notCurrent{
			color:#ccc;
		}
		&.today{
			background:red;
			color:#fff;
		}
		&.current{
			background:#409eff;
			color:#fff;
		}
		
	}
	.week{cursor: default;}
	
	.pannel-footer{
		font-size:12px;
		padding:10px;
		cursor:pointer;
	}
</style>
