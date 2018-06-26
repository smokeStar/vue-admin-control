<template>
    <div class="login" @click="login">
        <div class="btn">点我登录</div>
    </div>
</template>

<script>
export default {
	methods:{
		async login(){

            localStorage.setItem('isLogin', JSON.stringify(true));
            this.g.isLogin = true;
            this.$login();

            // 登录跳转页面
            for(let i = 0; i < this.g.routes.length; i++){
                let h1 = this.g.routes[i];
                if(h1.meta.show) return this.$router.push(h1.path);
            }
		}
	}
}
</script>

<style scoped >
.login{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn{
    width: 200px;
    height: 50px;
    background: skyblue;
    border-radius: 10px;
    margin-top: 100px;
    line-height: 50px;
}

</style>
