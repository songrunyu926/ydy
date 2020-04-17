<template>
<div class="user-report-container">
    <div style="width: 279px;height: 478px">
      <pic-zoom :url="imgUrl" :scale="3"></pic-zoom>
    </div>
    <div style="width: 279px;height: 478px">
      <pic-zoom :url="imgUrl" :scale="3"></pic-zoom>
    </div>
  </div>
</template>

<script>

import PicZoom from 'vue-piczoom'

  export default {
    data() {
      return {
        imgUrl: require("../../assets/images/company/miandan.png")
      }
    },
    components: {
    'pic-zoom': PicZoom
  }
  
  }
</script>

<style lang="less" scoped>
.user-report-container {
  padding: 30px 40px;
  background: #fff;
  display: flex;
}
</style>
