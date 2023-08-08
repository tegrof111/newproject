<template>
  <el-tree
    ref="tree"
    node-key="id"
    show-checkbox
    :data="treeData"
    :disabled="isEdit"
  />
</template>

<script>
// import { treeQuery } from '@/api/right/resource'

export default {

  props: {
    isEdit: { type: Boolean, default: null }
  },
  // props: ['message'],
  // props: {
  //   parentData: { type: Object,
  //     default: function() {
  //       return {}
  //     }
  //   }
  // },
  data() {
    return {
      treeData: []
    }
  },
  created() {
    // console.log('111')
    // console.log('parentData:', this.parentDataData)
    // console.log(this.message)
    this.getResourceTree()
  },
  mounted() {
    this.monitoring1() // 注册监听事件
    this.monitoring2()
  },
  methods: {
    // 获取资源树
    getResourceTree(val) {
      this.parentData = val
      this.treeData = this.transform(val)
      console.log('isEdit:', this.isEdit)
    },
    // setChecked(id, selection, child) {
    //   // this.$refs.tree
    // },
    // map返回空值报错，加判断
    // 方法一
    // getCheckedNodes() {
    //   console.log('this.$refs.tree.getCheckedNodes()', this.$refs.tree.getCheckedNodes())
    // },
    // getHalfCheckedKeys() {
    //   // this.$refs.tree.getHalfCheckedKeys()
    // },
    // 方法二
    monitoring1() { // 监听事件
      this.$on('getCheckedNodes', () => {
        console.log('触发监听事件1监听成功')
      })
      this.$on(' getHalfCheckedKeys', () => {
        console.log('触发监听事件2监听成功')
      })
      console.log('触发监听事件12监听成功')
    },
    monitoring2() { // 监听事件2
      this.$on(' getHalfCheckedKeys', () => {
        console.log('触发监听事件2监听成功')
      })
    },
    transform(list) {
      // var map = {}; var node; var tree = []; var i
      var tree = []
      // 存储一级节点（系统）
      list.map((item) => {
        if (parseInt(item.parentId) === -1 && item.resourceType === 2) {
          tree.push({ label: item.name, id: item.id, children: [] })
        }
      })
      // 存储二级节点（主菜单）
      tree.map((itemParent) => {
        list.map((item) => {
          if (itemParent.id === item.parentId) {
            itemParent.children.push({
              id: item.id,
              label: item.name,
              children: []
            })
          }
        })
      })
      // 存储三级节点（子菜单）
      tree.map((itemParent) => {
        itemParent.children.map((itemSecondParent) => {
          list.map((item) => {
            if (itemSecondParent.id === item.parentId) {
              itemSecondParent.children.push({
                id: item.id,
                label: item.name,
                children: []
              })
            }
          })
        })
      })
      // 存储四级节点（请求权限）
      tree.map((itemParent) => {
        itemParent.children.map((itemSecondParent) => {
          itemSecondParent.children.map((itemthirdParent) => {
            list.map((item) => {
              if (itemthirdParent.id === item.parentId) {
                itemthirdParent.children.push({ id: item.id, label: item.name })
              }
            })
          })
        })
      })
      return tree
    },
    fillTree(res) {
      for (let i = 0; i < res.data.length; i++) {
        // console.log('res2:', res)
        this.$nextTick(() => {
          this.$refs.tree.setChecked(res.data[i].id, true, false)
        })
      }
    }

  }
}
</script>
