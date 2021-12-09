<template>
  <div id="app">
    <!-- <ace-editor ref="editor"></ace-editor>
    <div class="layout-preview">
      <div class="title">效果预览</div>
      <iframe id="preview" frameborder="0"></iframe>
    </div> -->
    <!-- <ace-editor-2></ace-editor-2> -->

    <!-- <router-link to="/page1">Login</router-link>
    <router-link to="/page2">Editor</router-link> -->

    <el-button v-if="this.$store.state.isAuth == 0" @click="toLogin">
      Login
    </el-button>
    <el-button v-else @click="toUserInfo">UserInfo</el-button>
    <el-button @click="toEditor">
      Editor
    </el-button>
    <el-button @click="toNoteList">
      Notes
    </el-button>
    <router-view></router-view>
  </div>
</template>

<script>
// import aceEditor from './components/ace-editor.vue';
// import aceEditor2 from './components/ace-editor-2.vue';
// import login from './components/login.vue'
export default {
  name: 'App',
  components: {
    
  },
  data() {
    return{
      isAuth:false
    }
  },
  methods:{
    toLogin() {
      //this.$router.push("/xx")
      //传递的参数用{{ $route.query.xxx }}获取
      this.$router.push({path: '/login'})
      //后退两步
      //this.$router.go(-2)
    },
    toEditor() {
      this.$router.push({path: '/editor'})
    },
    toUserInfo() {
      this.$router.push({path:'/userInfo'})
    },
    toNoteList() {
      if(this.$store.state.isAuth === 0){
        this.$message('先登录哟(＾Ｕ＾)ノ~ＹＯ');
      } else {
        this.$router.push({path:'/noteList'})
      }
    }


    // 测试发送请求
    // testAxios(){
    //   localStorage.setItem('Token','1')
    //   this.$http({
    //   method: 'post',
    //   url: '/user/testPost',
    //   })
    //   .then(({ data }) => {
    //   console.log(data);
    //   })
    //   .catch(({ error }) => {
    //   console.log("Post err");
    //   console.log(error);
    //   })
    //   this.$http.get('/user/testGet')
    //   .then(({ data }) => {
    //   console.log(data);
    //   })
    //   .catch(({ error }) => {
    //   console.log("Get err");
    //   console.log(error);
    //   })
    // }

    
  }
}
</script>