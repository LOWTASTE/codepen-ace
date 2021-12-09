//引入vue
import Vue from 'vue';
//引入vue-router
import VueRouter from 'vue-router';
//第三方库需要use一下才能用
Vue.use(VueRouter)
//引用页面
import login from '../components/login.vue';
//引用页面
import aceEditor from '../components/ace-editor.vue';
import register from '../components/register.vue';
import findBackPwd from '../components/findBackPassword.vue';
import userInfo from '../components/userInfo.vue';
import noteList from '../components/noteList.vue'

//定义routes路由的集合，数组类型
const routes = [
    //单个路由均为对象类型，path代表的是路径，component代表组件
    {path:'/login',component:login},
    {path:'/editor',component:aceEditor},
    {path:'',redirect:"/editor"},
    {path:'/register',component:register},
    {path:'/findBackPwd',component:findBackPwd},
    {path:'/userInfo',component:userInfo},
    {path:'/noteList',component:noteList}
]

//实例化VueRouter并将routes添加进去
const router = new VueRouter({
//ES6简写，等于routes：routes
    routes
});

//抛出这个这个实例对象方便外部读取以及访问
export default router