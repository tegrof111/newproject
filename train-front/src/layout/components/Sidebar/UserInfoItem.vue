<template>
  <div :hidden="isCollapse">
    <el-menu-item style="height: 120px;display: flex" align="left">
      <el-avatar :size="80" :src="avatar" style="margin-top: 10px;flex:1" />
      <div style="margin-left:10px;flex:1">
        <div><font style="font-size: 15px;color: #fff;font-weight:600">{{ userName }}</font></div>
        <div style="display:flex;width:50px;cursor: pointer;">
          <div style="display:flex;" class="status_inline">
            <!-- <font style="font-size: 90px;color: #00FF66;overflow:auto;border-radius: 10px;">·</font>
             -->
            <font style="color:#00FF66;font-size:20px;margin-left:-10px;margin-top:-2px;margin-right:4px">●</font>
            <font style="font-size:10px;margin-right:6px">在线</font>
          </div>
          <div class="status_outline">
            <svg-icon icon-class="退出登录" style="margin-right:4px;font-size:14px" />
            <font style="font-size:10px" @click="logout">注销</font>
          </div>
        </div>
      </div>
    </el-menu-item>
  </div>
</template>

<script>
import FormDialog from '@/components/FormDialog/index.vue'
import SvgIcon from '@/components/SvgIcon'
export default {
  name: 'UserInfoItem',
  components: { FormDialog, SvgIcon },
  props: {
    // 头像
    avatar: {
      type: String,
      default: null
    },
    // 用户名
    userName: {
      type: String,
      default: ''
    },
    // 是否收缩侧边栏
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    }
  }
}
</script>

<style scoped>
.el-avatar>>>img {
    display: block;
    height: 110%;
    margin-left: 0px;
    border-radius: 50%;
    margin-top: -1px;
}
.status_inline:hover {
  color: #4092d3;
}
.status_outline:hover{
  color: #4092d3;
}
</style>
