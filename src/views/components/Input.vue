<template>
  <form class="input-container">
    <input placeholder="记录点什么吧。" ref="input" />
    <div :class="['recording', !loading && 'hide']">记录中...</div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Input",
});
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
  position: relative;
  align-items: center;
  flex-direction: column;
}
input {
  width: 500px;
  outline: none;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  color: #777;
  transition: all 200ms;

  &::placeholder {
    color: #bbb;
    font-weight: 300;
  }

  &:hover {
    border-color: #bbb;
  }

  &:focus {
    border-color: #777;
  }
}
.recording {
  width: 500px;
  margin: 4px 0 0 12px;
  font-size: 13px;
  color: #999;
  &.hide {
    visibility: hidden;
  }
}
</style>
