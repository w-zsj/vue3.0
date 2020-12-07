<template>
  <div class="footBox flex flex-aic" :class="{'static':!position,'ipx':ipx}" @click="callApp">
    <div class="input flex-aic">我有话说...</div>
    <div class="laud flex flex-aic">
      <ico :name="info.attitudecount>0?'posting-like':'posting-like-gray'"></ico>
      <span class="fontBold">{{info&&info.attitudecount}}</span>
    </div>
    <div class="collect">
      <ico :name="info&&info.collected?'collection':'collection-icon'"></ico>
    </div>
    <ico :name="!position?'news':'posting-share'"></ico>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default: {}
    },
    position: {
      // 视屏详情 取消定位
      type: Boolean,
      default: true
    }
  },
  computed: {
    ipx () {
      return this.$root.ipx
    }
  },
  mounted () {
    console.log('postingDetail', this)
  }
}
</script>
<style  scoped lang="scss">
.footBox {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #282828;
  padding: 7 * $px 15 * $px 7 * $px 15 * $px;
  box-shadow: 0px -10px 15px 0px rgba(0, 0, 0, 0.03);

  z-index: 99;
  transform: translateZ(0);
  &.ipx {
    padding-bottom: 34 * $px;
  }
  &.static {
    position: static;
    width: 100%;
    .input {
      background: transparent;
      color: #505050;
      padding-left: 0;
    }
  }
  .input {
    width: 189 * $px;
    height: 36 * $px;
    border-radius: 18 * $px;
    padding: 0 0 0 18 * $px;
    background: #3c3c3c;
    font-size: 16 * $px;
    color: #969696;
    margin-right: 15 * $px;
    line-height: 22 * $px;
  }
  .laud {
    margin-right: 20 * $px;

    span {
      color: #e6c36e;
      font-size: 14 * $px;
      font-weight: bold;
      padding-left: 5 * $px;
    }
  }
  .collect {
    margin-right: 20 * $px;
  }
}
</style>
