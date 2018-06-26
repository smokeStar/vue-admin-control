<template>

</template>

<script>
export default {
	data(){
		return{

			isLogin : JSON.parse(localStorage.getItem('isLogin')) || false,
			routes  : [],
			map     : {},
		}
		
	},
	methods:{

	},
	computed:{
		$url(){
			return this.$rotuer.fullPath;
		}
	}
	
}
</script>

<style scoped>

</style>
