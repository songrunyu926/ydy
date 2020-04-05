<template>
  <div class="send-scan">
    <card-model></card-model> 
  </div>
</template>

<script>

import cardModel from '@/components/personal-card/card-model'

export default {
  name: 'send-scancode',
  components: {
    'card-model': cardModel
  }
}
</script>

<style lang="less" scoped>
  .send-scan {
    padding: 40px 80px 80px;
  }
</style>
