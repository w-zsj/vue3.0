<template>
  <div class="confimBox" v-if="isShowConfim">
    <div class="mask"></div>
    <div class="content">
      <div class="header">{{title}}</div>
      <div class="info">{{info}}</div>
      <div class="btns flex flex-between">
        <div class="btn cancel" @click="cancelFun">{{cancelText}}</div>
        <div class="btn confirm" @click="confirmlFun">{{confirmText}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { GoApp } from '@/utils/util'
export default {
  name: 'ConfirmGoApp',
  props: {
    title: { type: String },
    info: { type: String },
    cancelText: { type: String },
    confirmText: { type: String },
    isShowConfim: { type: Boolean } // 是否显示Confim弹框
  },
  computed: {

  },
  methods: {
    // 取消
    cancelFun () {
      this.$emit('cancel', false)
    },
    // 确认
    confirmlFun () {
      GoApp()
    }
  }
}
</script>
<style lang="scss">
.confimBox{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 90;
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 91;
    background: rgba(0,0,0,.7);
  }
  .content{
    position: absolute;
    background: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 92;
    width: 73%;
    padding-top: 30*$px;
    border-radius: 2*$px;
    .header{
      margin-bottom: 12*$px;
      height: 24*$px;
      line-height: 24*$px;
      font-size: 17*$px;
      font-weight: bold;
      color: #232323;
      text-align: center;
    }
    .info{
      padding: 0 20*$px 24*$px;
      color: #646464;
      font-size: 13*$px;
      font-weight: 400;
      line-height: 21*$px;
      text-align: center;
    }
    .btns{
      padding: 0 3%;
      margin-bottom: 16*$px;
      height: 40*$px;
      line-height: 40*$px;
      .btn{
        margin: 0 7*$px;
        width: 45.5%;
        font-size: 14*$px;
        height: 40*$px;
        line-height: 40*$px;
        border: 1*$px solid #FA2337;
        border-radius: 2*$px;
        text-align: center;
        &.cancel{
          color: #FA2337;
        }
        &.confirm{
          color: #fff;
          background: #FA2337;
        }
      }

    }
  }
}
</style>
