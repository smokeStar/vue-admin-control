<template>
    <div class="role">
    	<el-table :data="list" style="width: 100%" border>
    		<el-table-column label="角色编码" width="280">
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.code }}</span>
				</template>
    		</el-table-column>
		    <el-table-column label="角色名称" width="280">
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.name }}</span>
				</template>
		    </el-table-column>
		    <el-table-column label="操作">
		    	<template slot-scope="scope">
		        <el-button
		        	size="mini">修改</el-button>
		        <el-button
		        	size="mini"
		        	type="danger">删除</el-button>
		        <el-button
		        	size="mini"
		        	type="success" @click="$router.push('/sys/pv/menu?id='+ scope.row.code)">操作权限</el-button>
		      </template>
		    </el-table-column>
  		</el-table>
    </div>
</template>

<script>
export default {
	data(){
		return{
			list : [
				{ code : 'admin',  name : '管理员' },
				{ code : 'user',   name : '用户'   },
				{ code : 'other',  name : '其他'   },
			]
		}
	}
    
}
</script>

<style scoped>
.role{
	width: 100%;
	height: 100%;
	padding: 90px;
	margin-left: -30px;
	box-sizing: border-box;
	text-align: left;
}

</style>
