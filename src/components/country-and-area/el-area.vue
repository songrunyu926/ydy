<template>
  <area-cascader
    type="text"
    size="large"
    style="line-height: 24px;"
    :level="1"
    v-model="city"
    :data="pcaa"
    placeholder="请选择城市"
  ></area-cascader>
</template>

<script>
import { pcaa } from "area-data";

export default {
  name: "el-area",
  data() {
    return {
      pcaa: pcaa,
      city: []
    };
  },
  watch: {
    city: function(val) {
      this.bus.$emit('chooseCity',val)
    }
  }
};
</script>

<style></style>
