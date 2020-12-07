<template>
  <div>
    <nut-picker
      :is-visible="isvisible"
      :list-data="list"
      title="请选择商品类型"
      @close="close"
      @confirm="confirm"
    ></nut-picker>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      isvisible: false,
    };
  },
  props: {
    title: {
      type: String,
      default: "请选择商品类型",
    },
    arr: {
      type: Array,
      default: () => [],
    },
    isvisible: {
      type: Boolean,
      default: false,
    },
    closeCall: {
      type: Function,
    },
    confirmCall: {
      type: Function,
    },
  },
  watch: {
    arr: function (newval, oldval) {
      if (newval.length) {
        this.list = newval;
      }
    },
  },
  methods: {},
};
</script>