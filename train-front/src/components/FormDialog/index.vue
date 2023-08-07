<!-- 封装了编辑和保存的对话框，用于开发过程统一代码和样式表单的内容由slot定义 -->
<template>
  <el-dialog
    :title="caption"
    :visible.sync="visible"
    :width="width"
    :before-close="onBtnCancelClick"
    :lock-scroll="false"
    :modal="true"
    :close-on-click-modal="false"
    @close="onBtnCancelClick"
  >
    <el-form
      ref="formName"
      :model="model"
      label-position="left"
      :rules="rules"
      label-width="80px"
    >
      <slot />
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button id="btnCancel" @click="onBtnCancelClick">取 消</el-button>
      <el-button
        id="btnOK"
        type="primary"
        @click="onBtnSaveClick('formName')"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    caption: { type: String, required: true, default: '信息维护' },
    width: { type: String, required: true, default: '50%' },
    visible: { type: Boolean, default: true },
    model: { type: Object, required: true },
    rules: { type: Object, required: true }
  },
  data() {
    return {
      queryLoading: false
    }
  },
  methods: {
    // 取消的时候回调外部事件
    onBtnCancelClick() {
      this.queryLoading = true
      this.$emit('CancelButtonClick', this)
      this.queryLoading = false
      this.visible = false
    },

    // 如果操作较长时间则显示进度 如果校验通过则回调父组件定义的操作
    onBtnSaveClick(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.queryLoading = true
          this.$emit('OkButtonClick', this)
          this.queryLoading = false
          this.visible = false
        }
      })
    },

    // 关闭
    handleClose() {
      this.onBtnCancelClick()
    }
  }
}
</script>
<style scoped>
.el-dialog {
  position: relative;
  margin: 0 auto 0px;
  background: #ffffff;
  border-radius: 2px;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 50%;
  height: 60%;
}
.el-dialog__body {
  border-top: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  max-height: 85% !important;
  min-height: 70%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 2px;
    background-color: #ccc;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0ae;
  }
  &::-webkit-scrollbar-track {
    background-color: #ccc;
  }
}
</style>
