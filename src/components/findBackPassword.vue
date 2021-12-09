<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="userName">
            <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号码" prop="userPhone">
            <el-input v-model.number="ruleForm.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="findbackPassword('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
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
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码(￣o￣) . z Z'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码||ヽ(*￣▽￣*)ノミ|Ю'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!(⊙﹏⊙)'));
        } else {
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
      }
      return {
        ruleForm: {
          password: '',
          checkPass: '',
          userName: '',
          userPhone: ''
        },
        state: false, 
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          userName: [
            { validator: checkName, trigger: 'blur' }
          ],
          userPhone: [
            { validator: validatePhoneNumber, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
        findbackPassword(formName) {
            this.$refs[formName].validate((valid) => {
            // 验证成功发送请求
            if (valid) {
                this.$http({
                method: 'post',
                url: '/user/findBackPwd',
                data: {
                    userName: this.ruleForm.userName,
                    userPhone: this.ruleForm.userPhone,
                    password: this.ruleForm.password
                }
            })
            .then(({ data }) => {
                console.log(data);
            })
            .catch(({ error }) => {
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
    }
}
</script>

<style>

</style>