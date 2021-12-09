<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="userName">
            <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button type="primary" @click="toRegister()">注册</el-button>
            <el-button type="danger" @click="toFindbackPassword()">找回密码</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
  export default {
    data() {
      var checkName = (rule, value, callback) => {
        if (value === '') {
          setTimeout(() => {
            callback(new Error('请输入用户名、(*￣3￣)╭'));
        }, 1000);
        }
        else{
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          password: '',
          userName: ''
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          userName: [
            { validator: checkName, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      login(formName) {
        this.$refs[formName].validate((valid) => {
          // 验证成功发送请求
          if (valid) {
            this.$http({
              method: 'post',
              url: '/user/login',
              data: {
                  userName: this.ruleForm.userName,
                  password: this.ruleForm.password
              }
            })
            .then(({ data }) => {
              // 保存Token和登录信息
              console.log(data);
              // 这里用了两种方式，localstore 和 vueX 分别 Token 和 userId
              localStorage.setItem('Token',data.token)
              this.$store.state.userId = data.userId
              this.$store.commit('auth')
              console.log(this.$store.state.isAuth)
              console.log(this.$store.state.userId)
               this.$router.push({path: '/userInfo'})
            })
            .catch(({ error }) => {
              console.log("err");
              console.log(error);
            })
          }
          else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      toRegister(){
        this.$router.push({path: '/register'});
      },
      toFindbackPassword(){
        this.$router.push({path: '/findBackPwd'});
      }
    }
    // mount() {
    //   console.log(localStorage.getItem('Token'))
    //   if(localStorage.getItem('Token')!=undefined){
    //     this.$store.commit('auth')
    //   }
    //   console.log(this.$store.state.isAuth)
    // }
  }
</script>