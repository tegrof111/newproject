<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click" size="medium">
        <div class="avatar-wrapper">
          <hamburger class="hamburger-container" />
          <el-tooltip effect="dark" content="全屏" placement="bottom">
            <svg-icon
              icon-class="全屏"
              class="quanping_icon"
              style="font-size: 15px"
              @click="toggleFullScreen"
            />
          </el-tooltip>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item
            divided
            icon="el-icon-switch-button"
            @click.native="logout"
          >
            退出登录
          </el-dropdown-item>
          <el-dropdown-item divided> 系统切换: </el-dropdown-item>
          <el-dropdown-item>
            <template>
              <el-radio-group
                v-model="systemRadio"
                size="medium"
                style="display: flex; flex-direction: column"
              >
                <el-radio
                  label="1"
                  style="margin-top: 10px"
                  @change="changeMainMenu"
                >主导航菜单</el-radio>
                <el-radio
                  v-for="(item, index) in systemDTO"
                  :key="index"
                  :label="item.link"
                  style="margin-top: 10px"
                  @change="changeSystem(item.link)"
                >{{ item.name }}</el-radio>
              </el-radio-group>
            </template>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="user-info">
      <svg-icon icon-class="首页" style="font-size: 16px" class="shouye_icon" />
      <font
        style="font-size: 15px; margin-left: 4px"
        class="user_name"
      >当前租户：({{ tenantCount }}) {{ tenantName }}</font>
      <!-- <font  class="quanping_text">全屏</font> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { commonQuery } from '@/api/right/subSystem'
import { commonQueryTenant, querytenantById } from '@/api/org/tenant'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      userName: this.$store.getters.name,
      tenantId: this.$store.getters.tenantId,
      systemRadio: '1',
      systemDTO: [],
      tenantCount: 0,
      tenantName: ''
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  mounted() {
    this.getSubSystem()
    this.queryTenant()
    this.queryTenantById()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      // window.sessionStorage.clear()
      this.$router.push(`/login`)
      // this.$router.push('/login')
    },
    // 查询租户
    queryTenant() {
      const tenantQuery = {}
      tenantQuery.pageSize = 1000
      commonQueryTenant(this.tenantQuery)
        .then((response) => {
          const { total, pageNum, pageSize } = response
          this.tenantCount = parseInt(total)
        })
        .catch(() => {
          this.$message.error('网络异常')
        })
    },
    queryTenantById() {
      querytenantById(this.tenantId).then((res) => {
        this.tenantName = res.name
      })
    },
    // 全屏放大
    toggleFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
    },
    // 获取子系统
    getSubSystem() {
      commonQuery().then((res) => {
        this.systemDTO = res.data
        console.log(this.systemDTO)
      })
    },
    // 主导航菜单
    changeMainMenu() {
      this.$router.push('/')
    },
    // 切换子系统
    changeSystem(value) {
      window.location.href = value
      console.log(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }
  .user-info {
    height: 100%;
    line-height: 55px;
    float: right;
    cursor: pointer;
    .shouye_icon,
    .user_name {
      &:hover {
        color: #409eff;
      }
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
