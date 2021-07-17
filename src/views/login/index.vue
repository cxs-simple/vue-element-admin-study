<template>
  <div class="login-container">
    <el-form class="login-form" ref="loginForm" :model="loginForm" :rules="loginRules">

      <!-- 标题区域 -->
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <!-- 用户名区域 -->
      <el-form-item prop="username">
        <el-input 
          type="text" 
          tabindex="1" 
          ref="username" 
          v-model="loginForm.username" 
          placeholder="请输入用户名" 
          prefix-icon="el-icon-user"
        />
      </el-form-item>

      <!-- 密码区域 -->
      <el-tooltip v-model="capsTooltip" effect="dark" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <el-input 
            ref="password"
            tabindex="2"
            :type="passwordType"
            v-model="loginForm.password" 
            placeholder="请输入密码" 
            prefix-icon="el-icon-lock" 
            @keyup.native="checkCapslock"
            @keyup.enter.native="doLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <i :class="passwordType === 'password' ? 'iconfont icon-eye' : 'iconfont icon-openeye'"></i>
          </span>
        </el-form-item>
      </el-tooltip>

      <!-- 按钮区域 -->
      <el-form-item>
        <el-button :loading="loading"  tabindex="3" type="primary" class="width-100p" @click="doLogin">登录</el-button>
      </el-form-item>
      <el-form-item class="login-button">
        <el-link type="primary" class="line-height-15" @click="dialogVisible=true">其他登录方式</el-link>
      </el-form-item>
    </el-form>

    <!-- 对话框 -->
    <el-dialog title="其他登录方式" :visible.sync="dialogVisible">
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
// 引入validate.js
import { validUsername } from '@/utils/validate'
// 引入SocialSingin组件
import SocialSign from './components/SocialSignin'

  export default {
    name: 'Login',
    components: { SocialSign },
    data() {
      // 自定义用户名校验规则
      const validateUsername = (rule, value, callback) => {
        // 校验用户名输入是否正确
        if (value.trim() === '') {
          callback(new Error('请输入用户名'))
        } else if (!validUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }

      // 自定义密码长度校验规则
      const validatePassword = (rule, value, callback) => {
        if (value.trim() === '') {
          callback(new Error('请输入密码'))
        } else if (value.length < 6) {
          callback(new Error('请输入长度超过6位的密码'))
        } else {
          callback()
        }
      }

      return {
        // 登录用Form
        loginForm: {
          username: 'admin',
          password: '123456'
        },

        // 校验规则
        loginRules: {
          username: [{ trigger: 'blur', validator: validateUsername }],
          password: [{ trigger: 'blur', validator: validatePassword }]
        },
        
        passwordType: 'password',
        capsTooltip: false,
        dialogVisible: false,
        loading: false,
        redirect: undefined,
        otherQuery: {}
      }
    },
    watch: {
      // 监听路由
      $route: {
        handler: function(route) {
          const query = route.query
          if(query) {
            this.redirect = query.redirect
            // 获取请求url中的其他参数
            this.otherQuery = this.getOtherQuery(query)
            console.log('2222222222')
          }
        },
        // 是否以当前的初始值执行handler函数，页面加载时就用当前的route执行handler
        immediate: true
      }
    },
    mounted() {
      // 初始化输入框聚焦
      if (this.loginForm.username.trim() === '') {
        this.$refs.username.focus()
      } else if (this.loginForm.password === '') {
        this.$refs.password.focus()
      }
    },
    methods: {
      // 登录按钮按下后
      doLogin() {
          console.log('dologin')
        // 校验
        this.$refs.loginForm.validate(valid => {
          // 校验成功
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              // 重定向至登录后页面
            console.log("success submit!")
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            // 校验失败
            console.log('error submit!')
            return false
          }
        })
      },

      // 获取请求url中的其他参数
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if(cur != 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      },

      // eye按下后
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }

        // 重新聚焦
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },

      // 大写字母按下后
      checkCapslock(e) {
        const { key } = e
        this.capsTooltip = key && key.length == 1 && (key >= 'A' && key <= 'Z')
      }
    }
  }
</script>

<style lang="scss" scoped>
$dark_gray:#889aa4;

  .login-container {
    height: 100%;
    background-color:	#CAE1FF;

    .login-form {
      position: absolute;
      width: 520px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    
    .login-button {
      display: flex;
      justify-content: flex-end;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      color: $dark_gray;
    }
  }
</style>
