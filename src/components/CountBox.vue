<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub () {
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    handleAdd () {
      this.$emit('input', this.value + 1)
    },
    handleChange (e) {
      const num = +e.target.value // 转数字处理
      if (isNaN(num) || num < 1 || !Number.isInteger(Number(num))) {
        e.target.value = this.value // 如果不是数字，则回退为父组件传过来的
        // 数据
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>

<template>
<div class="count-box">
  <button @click="handleSub" class="minus">-</button>
  <input @change="handleChange" :value="value" type="text" class="inp">
  <button @click="handleAdd" class="add">+</button>
</div>
</template>

<style lang="less" scoped>
.count-box{
  width: 110px;
 display: flex;
  .minus , .add{
    width: 30px;
    height: 30px;
    background: #efefef;
  }
  .inp{
    width: 40px;
    height: 30px;
    margin: 0 5px;
    background: #efefef;
    text-align: center;
  }
}
</style>
