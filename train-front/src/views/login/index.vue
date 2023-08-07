<!-- 登录界面 -->
<template>
  <div>
    <!-- header -->
    <div class="titleInfo">
      <img class="titleLogo" src="../../assets/titleLogo.png" width="250">
      <div class="titleName">后台管理v1.0.0</div>
      <div class="operation">
        <a class="operaInfo">设为首页</a> |
        <a class="operaInfo" @click="CreateShortcut">收藏</a>
      </div>
    </div>
    <!-- body -->
    <div class="login-container">
      <!-- 触发验证弹窗 -->
      <slider
        v-if="isShowSlider"
        @SliderSucess="sliderSucess"
        @closeSlider="closeSlider"
      />
      <!-- 登录背景图 -->
      <!-- <img class="loginBg" src="../../assets/loginbg.jpg"> -->
      <!-- 登录表单 -->
      <div class="login">
        <div class="loginTitle">账号登录</div>
        <div class="ruleForm">
          <el-form ref="ruleForm" el-form :model="ruleForm" :rules="rules">
            <el-form-item prop="code">
              <el-input
                v-model="ruleForm.code"
                placeholder="请输入工号"
                prefix-icon="el-icon-user-solid"
                style="width: 80%"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="ruleForm.password"
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                style="width: 80%"
                show-password
                @keyup.enter.native="handleLogin"
              />
            </el-form-item>
            <el-form-item prop="account">
              <el-input
                v-model="ruleForm.account"
                placeholder="租户id"
                prefix-icon="el-icon-user-solid"
                style="width: 80%"
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="loginBtn">
          <el-button
            type="primary"
            :loading="loading"
            style="width: 80%; margin-bottom: 30px"
            @click.native.prevent="isShowSlider = true"
          >登录</el-button>
        </div>
      </div>
    </div>
    <!-- footer -->
    <div class="webInfo">
      <div class="code">
        <img src="../../assets/sd365Code.png" width="80" alt="" srcset="">
      </div>
      <div class="record">博思软件（股票代码：300525）</div>
      <div class="support">CopyRight &copy; 2021-2031 博思软件股份有限公司</div>
      <div class="suggest">
        浏览器：
        <a
          target="_blank"
          href="https://www.google.cn/intl/zh-CN/chrome/"
        >chrome90</a>/
        <a target="_blank" href="https://www.microsoft.com/en-us/edge">IE10</a>
        以上 | 分辨率建议1024*1960
      </div>
    </div>
  </div>
</template>

<style>
.titleInfo {
  position: relative;
  background-color: #ffffff;
  overflow: auto;
  zoom: 1;
}
.titleLogo {
  float: left;
}
.titleName {
  float: left;
  font-size: 25px;
  margin-top: 17px;
  font-weight: bold;
}
.operation {
  float: right;
  margin-top: 23px;
  margin-right: 10px;
}
.operaInfo:hover {
  color: #409eff;
}

.login-container {
  /* position: absolute; */
  width: 100%;
  background-image: url(~../../assets/loginbg.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  /* margin-left: 0%; */
  overflow: auto;
  zoom: 1;
}
/* .loginBg {
  margin-top: 10%;
  margin-bottom: 10%;
  margin-left: 13%;
  width: 520px;
  height: 400px;
  vertical-align: top;
  border-radius: 25px;
  float: left;
} */
.login {
  margin-top: 10%;
  margin-bottom: 10%;
  margin-left: 31%;
  width: 520px;
  height: 400px;
  background-color: #ffffff;
  /* border:solid; */
  border-radius: 25px;
  vertical-align: top;
  float: left;
}
.loginTitle {
  margin-top: 5%;
  margin-left: -72%;
  padding-left: 20px;
}
.el-input {
  margin-top: 10px;
  color: light_gray;
}
.el-input__inner {
  height: 55px;
}
.el-input__icon {
  height: 100%;
  line-height: 55px;
}
.el-form-item__error {
  margin-left: 10%;
}

.webInfo {
  height: 10%;
  width: 100%;
  background-color: #e4e7ed;
}
.record,
.support {
  color: #687f7f;
  font-size: 13px;
  padding-top: 10px;
}
a {
  color: inherit;
  text-decoration: none;
}
.suggest {
  color: red;
  font-size: 14px;
  padding-top: 10px;
  padding-bottom: 3px;
}
.code {
  position: absolute;
  right: 0%;
  font-size: 10px;
  padding-top: 5px;
}
</style>

<script>
// 引入滑块组件
import Slider from '@/views/login/Slider'
import { Message } from 'element-ui'

export default {
  name: 'Login',
  components: {
    Slider
  },
  /**
   * 解决四周白边问题
   * @param {*} to 后一个路由
   * @param {*} from 前一个路由
   * @param {*} next 下一个路由
   */
  beforeRouteEnter(to, from, next) {
    // 添加背景色 margin:0;padding:0是为了解决vue四周有白边的问题
    document.querySelector('body').setAttribute('style', 'margin:0;padding:0')
    next()
  },
  /**
   * 去除背景色
   * @param {*} to 后一个路由
   * @param {*} from 前一个路由
   * @param {*} next 下一个路由
   */
  beforeRouteLeave(to, from, next) {
    // 去除背景色
    document.querySelector('body').setAttribute('style', '')
    next()
  },

  data() {
    return {
      isShowSlider: false,
      labelPosition: 'right',
      ruleForm: {
        code: '',
        password: '',
        account: ''
      },
      /* 登录表单验证 */
      rules: {
        code: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [
          { required: true, message: '密码不能少于6位', trigger: 'blur' },
          { min: 6, message: '密码不能少于6位', trigger: 'blur' }
        ],
        account: [{ required: true, message: '租户号不能为空', trigger: 'blur' }]
      },
      loading: false,
      redirect: undefined
    }
  },
  methods: {
    /**
     * 创建收藏快捷方式
     */
    CreateShortcut() {
      alert('快捷键Ctrl+D收藏为书签')
      document.dispatchEvent(new KeyboardEvent('keydown', { key: '17' }))
      document.dispatchEvent(new KeyboardEvent('keydown', { key: '68' }))
      return false
    },
    /**
     * 触发登录校验弹窗
     */
    sliderSucess() {
      // console.log('slider sucess')
      var that = this
      setTimeout(function() {
        that.isShowSlider = false
      }, 1000)
      this.handleLogin()
    },
    /**
     * 关闭登录校验弹窗
     */
    closeSlider() {
      this.isShowSlider = false
    },
    /**
     * 处理界面登录请求，如果成功则返回200状态码
     */
    handleLogin() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 加载
          this.loading = true
          // 调用后端认证方法完成用户认证，向后台提交数据核对用户表
          this.$store.dispatch('user/login', this.ruleForm).then(res => {
            console.log(res.code)
            if (res.code === 200) {
              Message({
                message: res.msg,
                type: 'success',
                duration: 5 * 1000
              })
              // 用户信息正确，路由跳转
              console.log(2)
              this.$router.push({ path: '/' })
            }
          }).catch(() => {
            Message({
              message: '用户信息错误',
              type: 'error',
              duration: 5 * 1000
            })
            this.loading = false
          })
        } else {
          console.log('表单字段违反校验规则')
          return false
        }
      })
    }
  }
}
</script>
