<!-- 角色管理 -->
<template>
  <el-container>
    <div class="right">
      <!-- 搜索框 -->
      <el-row style="margin-left: 3px;">
        <div class="search">
          <el-form :inline="true">
            <el-form-item label="角色名称">
              <el-input v-model="roleQuery.name" placeholder="请输入角色名称" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryRoleByName">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-row>
      <!-- 操作按钮 -->
      <div class="top-button">
        <el-button type="primary" icon="el-icon-plus" @click="adddialogVisible = true;roleDto.status = 1">增加</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="batchRemoveRole">删除</el-button>
        <el-button type="primary" icon="el-icon-video-play" @click="getResourceDialog">资源分配</el-button>
        <el-button type="primary" icon="el-icon-s-custom" @click="getUserAll">用户分配</el-button>
        <el-button type="primary" icon="el-icon-s-custom">公司分配</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="refreshData">刷新</el-button>
      </div>
      <!-- 表格 -->
      <el-table
        id="roleTable"
        ref="roleTable"
        v-loading="listLoading"
        :data="tableData"
        style="width: 100% height: 600px"
        row-key="id"
        @row-dblclick="updateFromInfo"
      >
        <el-table-column
          type="selection"
          reserve-selection
        />
        <!-- 用插槽拿到当前行属性 -->
        <el-table-column fixed label="序号" prop="id" width="95">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="" label="角色" width="126">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column prop="" label="角色编号" width="126">
          <template slot-scope="scope">
            {{ scope.row.code }}
          </template>
        </el-table-column>
        <el-table-column prop="" label="角色备注" width="126">
          <template slot-scope="scope">
            {{ scope.row.remark }}
          </template>
        </el-table-column>
        <el-table-column prop="" label="所属公司" width="126">
          <template slot-scope="scope">
            {{ scope.row.companyDTO.name }}
          </template>
        </el-table-column>
        <el-table-column prop="" label="所属机构" width="126">
          <template slot-scope="scope">
            {{ scope.row.organizationDTO.name }}
          </template>
        </el-table-column>
        <el-table-column prop="" label="启用" width="126">
          <template slot-scope="scope">
            <el-tag size="mini" type="success">
              {{ scope.row.status === 1 ? '启用' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="copyRole(scope.row)"
            >复制</el-button>
            <el-button
              type=""
              size="mini"
              @click="updateFromInfo(scope.row)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="removeRole(scope.row)"
            >删除</el-button>
            <el-button
              type="warning"
              size="mini"
              @click="permission(scope.row)"
            >查看权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="block">
        <el-pagination
          :v-model="rolePage"
          :current-page.sync="rolePage.pageNum"
          :page-sizes="[5, 10, 20, 50, 100]"
          :page-size="rolePage.pageSize"
          :total="rolePage.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!--  增加的弹框-->
    <!-- 引入全局组件FormDialog -->
    <FormDialog
      :caption="addTitle"
      :visible.sync="adddialogVisible"
      :model="roleDto"
      :rules="rules"
      width="60%"
      @OkButtonClick="addRole"
      @CancelButtonClick="adddialogClose"
    >
      <el-row>
        <el-col :span="11">
          <el-form-item :span="12" label="角色名称" prop="name">
            <el-input v-model="roleDto.name" />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="角色代码" prop="code">
            <el-input v-model="roleDto.code" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="角色备注" prop="remark">
            <el-input v-model="roleDto.remark" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="是否启用">
            <template>
              <el-radio v-model="roleDto.status" :label="1">是</el-radio>
              <el-radio v-model="roleDto.status" :label="0">否</el-radio>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </FormDialog>
    <!-- 复制，编辑的弹框 -->
    <FormDialog
      :caption="updateTitle"
      :visible="updatedialogVisible"
      :model="roleDto"
      :rules="rules"
      width="60%"
      @OkButtonClick="updateRole"
      @CancelButtonClick="updatedialogVisible = false"
    >
      <el-row>
        <el-col :span="11">
          <el-form-item :span="12" label="角色名称" prop="name">
            <el-input v-model="roleDto.name" />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="角色代码" prop="code">
            <el-input v-model="roleDto.code" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="角色备注" prop="remark">
            <el-input v-model="roleDto.remark" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="是否启用">
            <template>
              <el-radio v-model="roleDto.status" :label="1">是</el-radio>
              <el-radio v-model="roleDto.status" :label="0">否</el-radio>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </FormDialog>
    <!--用户分配的弹框-->
    <el-dialog
      title="用户分配"
      :visible.sync="userdialogVisible"
      width="60%"
      length="100%"
      :before-close="handleClose"
    >
      <el-form :inline="true">
        <el-form-item label="用户名称：">
          <el-input v-model="userQuery.name" placeholder="请输入用户名称" />
        </el-form-item>
        <el-button
          style="margin-left: 5px"
          type="primary"
          @click="queryUserByName"
        >查询</el-button>
      </el-form>
      <el-table
        ref="userTable"
        v-loading="listLoading"
        :data="userData"
        selectable
        height="350"
        style="width: 100%"
      >
        <el-table-column type="selection" />
        <el-table-column label="用户工号" align="center">
          <template slot-scope="scope">
            {{ scope.row.code }}
          </template>
        </el-table-column>
        <el-table-column label="用户名" align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="公司" align="center" prop="company.name" />
        <el-table-column label="部门" align="center" prop="department.name" />
      </el-table>
      <el-pagination
        :v-model="userPage"
        :current-page.sync="userPage.pageNum"
        :page-size="userPage.pageSize"
        :page-sizes="[5, 10, 20, 50, 100]"
        :total="userPage.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleUserSizeChange"
        @current-change="handleUserDataChange"
      />
      <el-button
        style="margin-left: 30px"
        @click="userdialogVisible = false"
      >取 消</el-button>
      <el-button type="primary" @click="assignUser">确 定</el-button>
    </el-dialog>
    <!-- 资源分配的弹框 -->
    <el-dialog
      :title="resourceTitle"
      :visible.sync="resourcedialogVisible"
      width="60%"
      length="100%"
      :before-close="handleClose"
    >
      <!-- 引入全局组件BossTree -->
      <BossTree
        ref="bstree"
        :isEdit="isEdit"
      />
      <span>
        <el-button @click="resourcedialogVisible = false">取 消</el-button>
        <el-button v-if="!isReviewPerMission" type="primary" @click="assignResource">确 定</el-button>
      </span>

    </el-dialog>
  </el-container>
</template>

<style>
.right {
  margin-left: 2%;
  margin-top: 2%;
  border-block-color: #c7bebe;
}
.search {
  float: left;
}
.top-button{
  float: left;
}

</style>

<script>
import {
  // 添加角色
  add,
  // 删除角色
  remove,
  // 批量删除角色
  batchRemove,
  // 更新角色
  modify,
  // 初始化角色列表
  commonQuery,
  // 查询角色
  queryRoleById,
  // 初始化用户列表
  commonQueryUser,
  // 分配用户
  assignUser,
  // 分配资源
  assignResource
} from '@/api/right/role'
// 资源查询
import { treeQuery } from '@/api/right/resource'

export default {
  name: 'Role',
  data() {
    return {
      // data: [],
      resourceTitle: '',
      addTitle: '增加角色',
      updateTitle: '修改角色',
      isEdit: false,
      // 角色列表
      tableData: [],
      // 用户分配弹框用户列表
      userData: [],
      // 列表加载
      listLoading: false,
      // 角色列表弹框分页器
      rolePage: {
        // 总页数
        total: null,
        // 页码
        pageNum: 1,
        // 每页条数
        pageSize: 10,
        pages: null
      },
      // 用户分配弹框分页器
      userPage: {
        total: null,
        pageNum: 1,
        pageSize: 15,
        pages: null
      },
      // 角色表单验证规则
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '角色编号不能为空', trigger: 'blur' }
        ],
        remark: [{ required: false, message: '备注不能为空', trigger: 'blur' }],
        companyId: [
          { required: true, message: '所属公司不能为空', trigger: 'change' }
        ]
      },
      // 弹窗显示
      adddialogVisible: false,
      updatedialogVisible: false,
      userdialogVisible: false,
      resourcedialogVisible: false,
      isReviewPerMission: false,
      // 角色查询
      roleQuery: {},
      // 用户查询
      userQuery: {},
      // 角色资源
      roleResourceDTO: {},
      roleVo: {},
      // 角色列表数据
      roleDto: {
        // 角色名
        name: '',
        // 角色代码
        code: '',
        // 角色备注
        remark: '',
        id: '',
        status: '',
        version: '',
        created_by: '',
        companyId: '',
        tenantId: '',
        orgId: ''
      },
      // 角色id列表
      roleIdList: [],
      // 角色资源列表
      resourceIdList: [],
      // 用户id列表
      userIdList: [],
      // 选中的角色
      selected: '',
      // 选中的角色数据
      selectionData: [],
      // 对话框类型
      dialogType: '',
      // 资源数据
      resourceData: []
    }
  },
  /**
   * 初始化角色列表展示
   */
  created() {
    this.fetchData(this.rolePage.pageNum)
  },
  methods: {
    // 行内操作，打印行数据
    // handleEdit(index, row) {
    //   console.log(index, row)
    // },
    // handleDelete(index, row) {
    //   console.log(index, row)
    // },
    /**
     * 角色列表分页器
     */
    /**
     * 改变每页条数，重新获取数据
     * @param {*} val 当前页条数
     */
    handleSizeChange(val) {
      this.rolePage.pageSize = val
      this.fetchData(this.rolePage.pageNum)
    },
    /**
     * 获取当前页码
     * @param {*} val 当前页条数
     */
    handleCurrentChange(val) {
      this.fetchData(val)
    },
    /**
     * 用户列表分页器获取数据
     * @param {*} val 当前页条数
     */
    handleUserSizeChange(val) {
      this.userPage.pageSize = val
      this.getUser(this.userPage.pageNum)
    },
    // const getRowKeys = (row) => {
    //   // id 是后台传递的每行信息唯一标识
    //   return row.id
    // },
    /**
     * 用户列表分页器获取当前页码
     * @param {*} val 当前页条数
     */
    handleUserDataChange(val) {
      this.getUser(val)
      this.toggleSelection()
    },
    /**
     * 搜索栏通过角色名称查询角色
     */
    queryRoleByName() {
      this.rolePage.total = null
      this.rolePage.pages = null
      this.rolePage.pageNum = 1
      this.fetchData(this.rolePage.pageNum)
    },
    /**
     * 增加角色
     */
    addRole() {
      this.adddialogVisible = false
      this.roleDto.version = '1'
      this.roleDto.createdBy = '2'
      this.roleDto.tenantId = '1'
      this.roleDto.companyId = '1'
      this.roleDto.orgId = '1337376369553833984'
      add(this.roleDto)
        .then(() => {
          // 新增之后重新加载角色表格
          this.fetchData(1)
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    /**
     * 清空增加角色表单内容
     */
    adddialogClose() {
      this.roleDto = {
        name: '',
        code: '',
        remark: '',
        id: '',
        status: '1',
        version: '',
        created_by: '',
        companyId: '',
        tenantId: '',
        orgId: ''
      }
      this.adddialogVisible = false
    },
    /**
     * 删除角色
     * @param {*} row 当前行
     */
    removeRole(row) {
      this.$confirm('确定删除记录吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          remove(row.id, row.version)
            .then(() => {
              this.fetchData(1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: '删除失败!'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    /**
     * 批量删除角色
     */
    batchRemoveRole() {
      // 判断是否有选中角色
      const roleVo = this.$refs.roleTable.selection
      if (roleVo == null || roleVo.length === 0) {
        this.$message.error('至少选择一条进行操作')
        return
      }
      // 将选中角色循环添加进数组
      const roleDtoS = new Array(roleVo.length)
      for (let i = 0; i < roleVo.length; i++) {
        roleDtoS[i] = {
          id: roleVo[i].id,
          version: roleVo[i].version
        }
      }
      // 如果数组长度不为零，则提示是否删除
      if (roleDtoS.length !== 0) {
        this.$confirm('确定删除记录吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            batchRemove(roleDtoS).then((response) => {
              this.fetchData(1)
            })
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 清除复选框残留
            this.$refs.roleTable.clearSelection()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      } else {
        this.$message({
          message: '请选择需要删除的数据',
          type: 'warning'
        })
      }
    },
    /**
     * 编辑角色
     * @param {} row 当前行
     */
    updateFromInfo(row) {
      this.updatedialogVisible = true
      this.dialogType = 'update'
      queryRoleById(row.id)
        .then((res) => {
          this.roleDto = res
        })
        .catch((err) => {
          console.log(err)
        })
    },
    /**
     * 复制角色
     * @param {*} row 当前行
     */
    copyRole(row) {
      this.dialogType = 'copy'
      this.updatedialogVisible = true
      queryRoleById(row.id)
        .then((res) => {
          this.roleDto = res
        })
        .catch((err) => {
          console.log(err)
        })
    },
    /**
     * 编辑或复制角色
     */
    updateRole() {
      if (this.dialogType === 'update') {
        const roleVo = JSON.parse(JSON.stringify(this.roleDto))
        modify(roleVo)
          .then(() => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            // 新增之后重新加载
            this.fetchData(1)
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '修改失败!'
            })
          })
          .finally(() => {
            this.dialogType = ''
            this.roleVo = null
            this.updatedialogVisible = false
          })
      } else if (this.dialogType === 'copy') {
        this.roleDto.version = '1'
        this.roleDto.createdBy = '2'
        this.roleDto.tenantId = '1'
        this.roleDto.companyId = '1'
        this.roleDto.orgId = '1337376369553833984'
        const roleVo = JSON.parse(JSON.stringify(this.roleDto))
        add(roleVo)
          .then(() => {
            // 新增之后重新加载
            this.fetchData(1)
            this.$message({
              type: 'success',
              message: '复制成功!'
            })
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          })
          .catch(() => {
            this.listLoading = false
          })
          .finally(() => {
            this.dialogType = ''
            this.updatedialogVisible = false
          })
      }
    },
    /**
     * 查询用户
     */
    queryUserByName() {
      this.userPage.total = null
      this.userPage.pages = null
      this.userPage.pageNum = 1
      this.getUser(this.userPage.pageNum)
    },
    /**
     * 获取用户数据
     * @param {*} pageNum 页码
     */
    getUser(pageNum) {
      this.listLoading = true
      this.userQuery.total = this.userPage.total
      this.userQuery.pageNum = pageNum
      this.userQuery.pageSize = this.userPage.pageSize
      commonQueryUser(this.userQuery)
        .then((response) => {
          const { total, pageNum, pageSize, pages } = response // 如果异常则被axios 的拦截器拦截并且显示错误码和消息
          this.userPage.total = parseInt(total)
          this.rolePage.pageNum = parseInt(pageNum)
          this.rolePage.pageSize = parseInt(pageSize)
          this.userPage.pages = parseInt(pages)
          this.userData = response.data
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    /**
     * 用户分配
     */
    assignUser() {
      // 判断是否选择用户
      const userVo = this.$refs.userTable.selection
      if (userVo == null || userVo.length === 0) {
        this.$message.error('至少选择一个用户进行操作')
        return
      }
      for (let i = 0; i < userVo.length; i++) {
        this.userIdList.push(userVo[i].id)
      }
      this.userdialogVisible = false
      console.log(this.roleIdList)
      const userRoleDTO = {
        roleIds: this.roleIdList,
        userIds: this.userIdList
      }
      // 请求后端接口
      assignUser(userRoleDTO)
        .then(() => {
          this.$message({
            message: '分配成功',
            type: 'success'
          })
          this.userIdList = []
          this.roleIdList = []
          // 进行重新加载
          this.fetchData(1)
        })
        .catch(() => {
          this.$message({
            message: '分配失败',
            type: 'error'
          })
        })
        .finally(() => {
          this.selectionData = []
        })
    },
    /**
     * 取消用户分配
     */
    cancelUser() {
      this.userdialogVisible = false
      this.selectionData = []
    },
    /**
     * 查询所有用户
     */
    getUserAll() {
      const roleVo = this.$refs.roleTable.selection
      if (roleVo == null || roleVo.length === 0) {
        this.$message.error('至少选择一个角色进行操作')
        return
      }
      this.userdialogVisible = true
      for (let i = 0; i < roleVo.length; i++) {
        this.roleIdList.push(roleVo[i].id)
      }
      this.getUser(this.userPage.pageNum)
    },
    /**
     * 关闭弹窗
     */
    handleClose() {
      this.adddialogVisible = false
      this.updatedialogVisible = false
      this.userdialogVisible = false
      this.resourcedialogVisible = false
      this.companydialogVisible = false
    },
    /**
     * 刷新
     */
    refreshData() {
      this.fetchData(this.rolePage.pageNum)
    },
    /**
     * 获取数据
     * @param {*} pageNum 当前页码
     */
    fetchData(pageNum) {
      this.listLoading = true
      this.roleQuery.total = this.rolePage.total
      this.roleQuery.pageNum = pageNum
      this.roleQuery.pageSize = this.rolePage.pageSize
      commonQuery(this.roleQuery)
        .then((response) => {
          // 如果异常则被axios的拦截器拦截并且显示错误码和消息
          const { total, pageNum, pageSize, pages } = response
          this.rolePage.total = parseInt(total)
          this.rolePage.pageNum = parseInt(pageNum)
          this.rolePage.pageSize = parseInt(pageSize)
          this.rolePage.pages = parseInt(pages)
          this.tableData = response.data
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
          const roleName = this.$route.query.name
          // 点击角色跳转存在则选中
          if (roleName) {
            const tableDate = this.tableData.find(
              (item) => item.name === roleName
            )
            this.$nextTick(() => {
              this.$refs.roleTable.toggleRowSelection(tableDate, true)
            })
          }
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    /**
     * selection中不包含row则是取消选中该行
     * @param {*} selection 选择的数据
     * @param {*} row 当前行
     */
    handleSelectionChange(selection, row) {
      const flag = selection.some((item) => {
        return item.id === row.id
      })
      const index = this.arrFindObjIndex(this.selectionData, row, 'id')
      if (!flag) {
        /**
         * selection中不包含row则是取消选中该行
         */
        if (index !== -1) {
          this.selectionData.splice(index, 1)
        }
      } else {
        if (index === -1) {
          this.selectionData.push(row)
        }
      }
    },
    /**
     * 记忆选中表格的checkbox
     */
    toggleSelection() {
      setTimeout(() => {
        this.userData.forEach((user) => {
          this.selectionData.forEach((selected) => {
            if (user.id === selected.id) {
              this.$refs.userTable.toggleRowSelection(user, true)
            }
          })
        })
      }, 500)
    },
    /**
     * 在一个对象数据中寻找某个对象的下标,通过key的值相等，判断数组中是否包含对象
     * @param {*} arr 数组
     * @param {*} obj 对象
     * @param {*} key 下标
     */
    arrFindObjIndex(arr, obj, key) {
      let index = -1
      arr.forEach((item, idx) => {
        if (item[key] === obj[key]) {
          index = idx
        }
      })
      return index
    },
    /**
     * 获取资源分配弹窗
     */
    getResourceDialog() {
      // 判断是否选中角色进行操作
      const roleVo = this.$refs.roleTable.selection
      if (roleVo == null || roleVo.length === 0) {
        this.$message.error('至少选择一个角色进行操作')
        return
      }
      this.resourceTitle = '资源分配'
      // console.log('resourceTitle', this.resourceTitle)
      this.listLoading = true
      this.isReviewPerMission = false
      this.resourcedialogVisible = true
      const resourceQuery = {}
      resourceQuery.pageSize = 1000
      /**
       * 查询出资源树
       */
      treeQuery(resourceQuery)
        .then((response) => {
          // this.resourceData = response.data
          // debugger
          console.log('response.data:', response.data)
          this.resourceData = response.data
          console.log('resourceData:', this.resourceData)
          this.$nextTick(() => {
            this.$refs.bstree.getResourceTree(this.resourceData)
          })
          // console.log('roleVo.length: ', roleVo.length)
          for (let i = 0; i < roleVo.length; i++) {
            this.roleIdList.push(roleVo[i].id)
          }
          console.log('roleIdList: ', this.roleIdList)
          // console.log('roleVo[i].id: ', roleVo[i].id)
          // debugger
          // 根据角色的id查询到角色所对应的资源进行打钩
          if (roleVo.length === 1) {
            this.fillResourceTree(roleVo[0].id)
          }
          // console.log(typeof response.data)
          // console.log(typeof this.resourceData)
        }).finally(() => {
          this.listLoading = false
        })
    },
    /**
     * 查询用户拥有的资源并回填
     * @param {*} roleId 用户id
     */
    fillResourceTree(roleId) {
      const resourceQuery = {}
      resourceQuery.pageSize = 1000
      resourceQuery.roleId = roleId
      treeQuery(resourceQuery)
        .then((res) => {
          console.log('res:', res)
          // res传到子组件
          this.$refs.bstree.fillTree(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    /**
     *  进行对应角色的资源分配
     */
    assignResource() {
      // 返回选中子节点的key
      // 方法一
      // const list = this.$refs.bstree.getCheckedNodes()
      // 方法二
      const list = this.$refs.bstree.$emit('getCheckedNodes')
      // console.log('this.$refs.bstree.getCheckedNodes()', this.$refs.bstree.$emit('getCheckedNodes'))
      // 返回选中子节点的父节点的key
      var listParent = this.$refs.bstree.$emit('getHalfCheckedKeys')
      // const listParent = this.$refs.bstree.getHalfCheckedKeys()
      console.log('list', list)
      console.log('listParent', listParent)
      // const listParent = this.$refs.tree.data
      listParent = Array.from(listParent)
      listParent.map((item) => {
        this.resourceIdList.push(item)
      })
      this.listLoading = true
      console.log('111')
      for (let i = 0; i < list.length; i++) {
        this.resourceIdList.push(list[i].id)
      }
      console.log('222')
      if (this.resourcedialogType === 'REVIEW') {
        this.resourcedialogType = ''
        console.log('333')
      } else { // 构建角色资源对象
        const roleResourceDTO = {
          roleIds: this.roleIdList,
          resourceIds: this.resourceIdList
        }
        console.log('roleResourceDTO', roleResourceDTO)
        // 请求后端接口
        // eslint-disable-next-line no-undef
        assignResource(roleResourceDTO)
          .then(() => {
            this.$message({
              message: '分配成功',
              type: 'success'
            })
            this.resourcedialogVisible = false
            this.resourceIdList = []
            this.roleIdList = []
            // 进行重新加载
            this.fetchData(1)
          })
          .catch(() => {
            this.$message({
              message: '分配失败',
              type: 'error'
            })
          }).finally(() => {
            this.listLoading = false
          })
      }
    },
    /**
     * 查看当前行角色拥有的资源
     * @param {*} row 当前行
     */
    permission(row) {
      this.resourceTitle = '角色权限'
      this.resourcedialogVisible = true
      this.resourcedialogType = 'REVIEW'
      this.isReviewPerMission = true
      // 禁用所有树节点
      this.isEdit = true
      const resourceQuery = {}
      resourceQuery.pageSize = 1000
      treeQuery(resourceQuery).then((response) => {
        this.resourceData = response.data
        console.log(response.data)
        this.$nextTick(() => {
          this.$refs.bstree.getResourceTree(response.data)
        })
        console.log('row.id:', row.id)
        this.fillResourceTree(row.id)
        // 禁用所有树节点
        // console.log('resourceData2:', this.resourceData)
        // this.$nextTick(() => {
        //   const flag = 'true'
        //   this.$refs.bstree.disableTreeNode(flag)
        //   console.log('this.$refs.bstree.disableTreeNode(flag):', this.$refs.bstree.disableTreeNode(flag))
        // })
      })
    }
  }
}
</script>
