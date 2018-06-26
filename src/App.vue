<template>
    <div id="app">
        <div class="top" v-if="$route.path != '/'">
            <div class="logo">Vue-Control </div>

            <el-menu :default-active="$path" class="el-menu-demo" router
                  mode="horizontal" background-color="#545c64" text-color="#fff"
                  active-text-color="#ffd04b" >
                <el-menu-item :index="item.path" v-show="item.meta.show"
                              v-for="item in g.routes" :key="item.path">
                    {{ item.name }}
                </el-menu-item>
            </el-menu>

            <div class="logout" @click='logout'>注销</div>
        </div>
        
        <div class="container">

            <div class="left" v-for="item in g.routes"
                 v-if="$path == item.path　&&　item.meta.show" :key="item.path">

                <div class="title">{{ item.name }}</div>

                <el-menu router :default-active="$route.path" class="el-menu-vertical-demo"         background-color="transparent">

                    <template v-for="h in item.meta.children"
                              v-if="$path == '/' + h.path.split('/')[1] && h.meta.show">

                        <el-submenu :index="h.path" v-if='h.meta.children' >
                            <template slot="title">
                                <span>{{ h.name }}</span>
                            </template>
                            <el-menu-item :index="p.path" v-for="p in h.meta.children"
                                          :key="p.path" v-show="p.meta.show">
                                {{ p.name }}
                            </el-menu-item>
                        </el-submenu>

                        <el-menu-item :index="h.path" v-else>
                            <span slot="title">{{ h.name }}</span>
                        </el-menu-item>

                    </template>
                </el-menu>
            </div>

            <div class="right">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isAdd : false
        }
    },
    computed:{
        $path(){
            let path = '/'+this.$route.path.split('/')[1];
            return path;
        }
    },
    created(){
        this.init();
    },

    methods:{
        logout(){
            this.g.isLogin = false;
            localStorage.setItem('isLogin', false);
            this.$router.push('/');
        },
        async init(){

            // 登录之前初始化所有路由
            this.g.routes.splice(0,3);

            let map1 = {};
            let map2 = {};
            let map3 = {};

            this.g.routes.forEach(r=>{
                let arr = r.path.split('/');
                if (arr.length == 4) map3['/' + arr[1] + '/' + arr[2]] = [];
                if (arr.length == 3) map2['/' + arr[1]] = [];
            });

            this.g.routes.forEach(r=>{
                let arr = r.path.split('/');
                arr.length == 4 && map3['/' + arr[1] + '/' + arr[2]]
                                && map3['/' + arr[1] + '/' + arr[2]].push(r);
                arr.length == 3 && map2['/' + arr[1]] && map2['/' + arr[1]].push(r);
            });

            this.g.routes.forEach(r=>{
                let arr = r.path.split('/');
                if(arr.length == 3 && map3['/' + arr[1] + '/' + arr[2]]){
                    r.meta.children = map3['/' + arr[1] + '/' + arr[2]];
                }
            });

            this.g.routes.forEach(r=>{
                let arr =r.path.split('/');
                if(arr.length == 2 && map2['/' + arr[1]]){
                    r.meta.children = map2['/' + arr[1]];
                }
            });

            // 倒叙删除, 以免误删
            for(let i = this.g.routes.length-1; i>=0; i--){
                let r   = this.g.routes[i];
                let arr = r.path.split('/');
                if(arr.length!=2){
                    this.g.routes.splice(i,1);
                }
            }

            // 登录之后按后台返回数据配置路由的显示与隐藏
            if(this.g.isLogin){

                this.$login()
            }
        }
    }
}
</script>

<style>
html, body{
  padding: 0;
  margin: 0;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.top{
    height:60px;
    width: 100%;
    overflow: hidden;
    background-color: #545c64;
    position: relative;
}
.logo{
    width: 180px;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    font-style: italic;
}
.logout{
    width: 180px;
    height: 60px;
    line-height: 60px;
    font-size: 15px;
    color: white;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
}
.logout:hover{
    color: #ffd04b;
}
.top>ul{
    min-width: 500px;
    height: 100%;
    margin-left: 180px !important;
}
.container{
    flex: 1;
    position: relative;
    display: flex;
}
.left{
    width: 180px;
    background-color: #F0F6F6;
    padding: 0;
    height: 100%;
    overflow-y: scroll; 
    position: relative;
}
::-webkit-scrollbar {
    width: 0px;     
}
.title{
    height: 100px;
    line-height: 100px;
    text-align: left;
    padding-left: 20px;
    box-sizing: border-box;
    font-weight: 600;
    font-size: 22px;
}
.left>ul{
    text-align: left;
    width: 100%;
    border-right: none;

}
.left>ul li{
    width: 100%;
}
.right{
    position: relative;
    height: 100%;
    overflow-y: scroll;
    flex: 1;
    overflow-x: hidden;
}

</style>
