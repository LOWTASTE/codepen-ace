<template>
  <div>
      <el-descriptions title="" direction="vertical" :column="4" border>
        <el-descriptions-item label="用户名">{{this.userInfo.userName}}</el-descriptions-item>
        <el-descriptions-item label="性别">{{this.userInfo.userGender}}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{this.userInfo.userPhone}}</el-descriptions-item>
        <el-descriptions-item label="地址" :span="2">{{this.userInfo.userAddr}}</el-descriptions-item>
        <el-descriptions-item label="邮箱">
        <el-tag size="small">{{this.userInfo.userEmail}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="格言">{{this.userInfo.userMotto}}</el-descriptions-item>
    </el-descriptions>
    <el-button type="primary" @click="doChange()">CHANGE</el-button>
    <el-button type="danger" @click="logout()">LOGOUT</el-button>
    <el-dialog :visible.sync="isChanging">
        <el-form :model="newUserInfo" status-icon :rules="rules" ref="newUserInfo" label-width="100px" class="demo-newUserInfo">
        <el-form-item label="用户名" prop="userName">
        <el-input v-model="newUserInfo.userName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="userGender">
        <el-input v-model="newUserInfo.userGender"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="userPhone">
        <el-input v-model.number="newUserInfo.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="userAddr">
        <el-input v-model="newUserInfo.userAddr"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
        <el-input v-model="newUserInfo.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="格言" prop="userMotto">
        <el-input  type="textarea" v-model="newUserInfo.userMotto"></el-input>
        </el-form-item>
        <el-form-item>

        <el-button type="primary" @click="update()">提交</el-button>
        <el-button @click="resetForm('newUserInfo')">重置</el-button>

        </el-form-item>
        </el-form>
    </el-dialog>
  </div>
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

        var validatePhoneNumber = (rule,value,callback) =>{
           if (!value) {
                return callback(new Error('号码不能为空'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
                if (value + ''.length < 9) {
                    callback(new Error('号码过短'));
            } else {
                callback();
            }
          }
        }, 1000);
        };

        return {
            userInfo:{
                userName:'',
                userPhone:'',
                userGender:'',
                userMotto:'',
                userCreateTime:'',
                userAddr:'',
                userEmail:''
            },
            newUserInfo:{
                userName:'',
                userPhone:'',
                userGender:'',
                userMotto:'',
                userCreateTime:'',
                userAddr:'',
                userEmail:''
            },
            isChanging:false,
            rules: {
                userName: [
                    { validator: checkName, trigger: 'blur' }
                ],
                userPhone: [
                    { validator: validatePhoneNumber, trigger: 'blur' }
                ]
            }
        }
    },
    methods : {
        getUserInfo(){
            this.$http.get('user/userInfo', {
                params: {
                    userId : this.$store.state.userId
                }
            }) 
            .then(({data}) => {
                console.log(data);
                this.userInfo.userName = data.data.userName;
                this.userInfo.userPhone = data.data.userPhone;
                this.userInfo.userGender = data.data.userGender;
                this.userInfo.userMotto = data.data.userMotto;
                this.userInfo.userCreateTime = data.data.userCreateTime;
                this.userInfo.userAddr = data.data.userAddr;
                this.userInfo.userEmail = data.data.userEmail;

                this.newUserInfo.userName = data.data.userName;
                this.newUserInfo.userPhone = data.data.userPhone;
                this.newUserInfo.userGender = data.data.userGender;
                this.newUserInfo.userMotto = data.data.userMotto;
                this.newUserInfo.userCreateTime = data.data.userCreateTime;
                this.newUserInfo.userAddr = data.data.userAddr;
                this.newUserInfo.userEmail = data.data.userEmail;
            })
        },
        logout(){
            this.$store.commit('unAuth');
            this.$store.state.userId = '';
            localStorage.setItem("Token","NONE");
            console.log(localStorage.getItem('Token'));
            console.log(this.$store.state.isAuth);
            this.$router.push({path: '/editor'})
        },
        doChange(){
            this.isChanging = true;
            console.log("changing")
        },
        update(){

            var tableUser = this.newUserInfo;
            tableUser['userId'] = this.$store.state.userId;
            this.$http({
              method: 'post',
              url: '/user/update',
              data: tableUser
            })
            .then(({data}) => {
                console.log(data.code)
                if(data && data.code === 0){
                    console.log(data);
                    this.getUserInfo();
                    this.isChanging = false;
                    this.$message({
                        message: '修改成功┗|｀O′|┛ 嗷~~',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: '修改失败(∪.∪ )...zzz用户名or手机号重复',
                        type: 'warning'
                    });
                }
            })
        }
    },
    created() {
        this.getUserInfo()
    }
}
</script>