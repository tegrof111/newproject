<!-- 验证滑块 -->
<template>
  <div class="slider">
    <div class="slider-item">
      <i class="el-icon-circle-close" @click="closeSlider" />
      <slide-verify
        :l="42"
        :r="10"
        :w="310"
        :h="155"
        :imgs="images"
        :slider-text="text"
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
      />
    </div>
  </div>
</template>

<style scoped>
.slider{
    position: absolute;
    width: 100%;
    height:100%;
    background-color:  rgba(0,0,0,0.1);
    color:white;
    z-index: 1;
}
.slider-item{
    position:relative;
    width:310px;
    height:240px;
    top: 27%;
    left: 38%;
    box-shadow: 0 0 10px rgba(255,255,255,0.8);
}
.el-icon-circle-close:before {
    content: "\e78d";
    margin-left: -310px;
    margin-top: 20px;
}
i {
        display: inline-block;
        position: relative;
        left: 300px;
        width:20px;
        height: 20px;
        cursor: pointer;
    }
</style>

<script>

export default ({
  name: 'Slider',
  data() {
    return {
      msg: '',
      text: '向右滑',
      // 随机选择验证图片
      images: [
        require('../../assets/SliderImages/slider (' + Math.round(Math.random() * 72) + ').jpg')
      ]
    }
  },
  methods: {
    /**
     * 验证成功
     */
    onSuccess() {
    /**
     * 调用父组件函数
     */
      this.$emit('SliderSucess')
    },
    /**
     * 验证失败
     */
    onFail() {
      this.msg = ''
    },
    /**
     * 刷新
     */
    onRefresh() {
      this.msg = ''
    },
    /**
     * 关闭，调用父组件函数
     */
    closeSlider() {
      this.$emit('closeSlider')
    }
  }
})
</script>
