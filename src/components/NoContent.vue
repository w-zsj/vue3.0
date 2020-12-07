<template>
  <div class="no-content txt-center">
    <img src="@/assets/img/no-comment.png" alt />
  </div>
</template>
<script>
export default {
  name: 'NoContent',
  props: {
    sourceType: { type: Number } 
  },
  computed: {
    conWord () {
      let temp = ''
      let sType = this.sourceType
      console.log(sType)
      if (sType == 1) {
        temp = '暂时还没有人发表看法噢~'
      } else if (sType == 3) {
        temp = '暂无评论'
      } else if (sType == 4) {
        temp = '暂无内容'
      } else if (sType == 2) {
        temp = '快来第一个评论！'
      } else {
        temp = '暂无讨论'
      }
      return temp
    }
  },
  methods: {}
}
</script>
<style lang="scss">
  .no-content {
    img {
      display: block;
      width: 200 * $px;
      margin: 30 * $px auto;
    }
    p {
      margin: 0 0 50 * $px;
      font-size: 16 * $px;
      color: #b4b4b4;
      line-height: 22 * $px;
    }
  }
</style>
