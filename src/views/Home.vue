<template>
	<div class="home">
		home
	</div>
</template>

<script>
	// @ is an alias to /src

	export default {
		name: 'Home',
		data() {
			return {
				data: [{
					"third_party_dept_id": "2",
					"dept_name": "全体教师",
					"parent_dept_id": "1"
				}, {
					"third_party_dept_id": "3",
					"dept_name": "学生成长",
					"parent_dept_id": "1"
				}, {
					"third_party_dept_id": "4",
					"dept_name": "初一年级",
					"parent_dept_id": "3"
				}, {
					"third_party_dept_id": "5",
					"dept_name": "初一（1）班",
					"parent_dept_id": "4"
				}, {
					"third_party_dept_id": "6",
					"dept_name": "初一（2）班",
					"parent_dept_id": "4"
				}, {
					"third_party_dept_id": "7",
					"dept_name": "初二年级",
					"parent_dept_id": "3"
				}, {
					"third_party_dept_id": "8",
					"dept_name": "初二（1）班",
					"parent_dept_id": "7"
				}, {
					"third_party_dept_id": "9",
					"dept_name": "初二（1-2）班",
					"parent_dept_id": "8"
				}],
				arr:[1,2,3,4,5,6,7]
			}
		},
		mounted() {
			let data = this.toTreeData(this.data,{
				id: 'third_party_dept_id',
				parentId: 'parent_dept_id',
				name: 'dept_name',
				rootId: 1
			});
			console.log(data);
			// console.log(data);
			// console.log(this.splitArr(this.arr,4));
		},
		methods: {
			splitArr (arr,num) {
				var resultArr=[];
				for (var i = 0,len=arr.length; i < len; i+=num) {
					resultArr.push(arr.slice(i, i+num));
				}
				return resultArr;
			},
			// formatData() {
			// 	let val=this.data.reduce(function(total,cur){
			// 		let index=total.findIndex(item=>item.third_party_dept_id == cur.parent_dept_id);
			// 		if(index > -1){
			// 			total[index].children.push({...cur})
			// 		}else{
			// 			total.push({...cur,children:[]});
			// 		}
			// 		return total;
			// 	},[]);
			// 	return val;
			// },
			toTreeData(dataArr, param) {
				var treeArr = [];
				for (var i = 0; i < dataArr.length; i++) {
					if (dataArr[i][param.parentId] == param.rootId) {
						var obj = {};
						obj[param.id] = dataArr[i][param.id];
						obj[param.name] = dataArr[i][param.name];
						obj.children = [];
						treeArr.push(obj);
						// dataArr.splice(i, 1);
						// i--;
					}
				}
				function createChildren(childArr) {
					if (dataArr.length !== 0) {
						for (var i = 0; i < childArr.length; i++) {
							for (var j = 0; j < dataArr.length; j++) {
								if (childArr[i][param.id] == dataArr[j][param.parentId]) {
									var obj = {};
									obj[param.id] = dataArr[j][param.id];
									obj[param.name] = dataArr[j][param.name];
									obj.children = [];
									childArr[i].children.push(obj);
									// dataArr.splice(j, 1);
									// j--;
								}
							}
							createChildren(childArr[i].children);
						}
					}
				}
				createChildren(treeArr);
				return treeArr;
			}
		}
	}
</script>
