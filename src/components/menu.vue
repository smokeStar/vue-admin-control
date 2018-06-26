<template>
    <div class="menu">
    	<el-tree   ref="tree" style="width:300px;"
	  			  :data="routes"   v-if="keys"
				  :default-checked-keys="keys"
	  			  :node-key="key"
	  			  :props="props"
		  		  show-checkbox  highlight-current default-expand-all	>
		</el-tree>

		<el-button @click="submit">提交</el-button>

		
    </div>
</template>

<script>
import { clone } from "../utlis/utlis.js"; 
export default {
	data(){
		return{
			routes : this.loadData(this.g.routes),
			keys : null,
			key : "path",
			props  : {
				label : 'name',
				children : 'menus'
			}
		}
	},
	created(){
		this.getData();
	},
	methods:{
		//  初始化一份路由表
		loadData(routes){
			let menuy = [];
			routes.forEach(r=>{
				let map = {};
				map["path"] = r.path;
				map['name'] = r.name;
				if(r.meta.children){
					map['menus'] = this.loadData(r.meta.children);
				}
				menuy.push(map);
			})
			return menuy;
		},

		async getData(){
			let res = await this.$http('static/data1.json');
			this.keys = res.data[this.$route.query.id];
		},

		submit(){
			let keys = this.$refs.tree.getCheckedKeys();
			let half = this.$refs.tree.getHalfCheckedKeys();
			console.log(keys.concat(half));
		}
	}
    
}
</script>

<style scoped>
.menu{
	width: 100%;
	height: 100%;
	padding: 60px;
	margin-left: -30px;
	box-sizing: border-box;
}
.tree{
	width: 500px;
}

</style>
