<template>
  <div class="posting-detail" v-if="hasdata == 1">
    <div class="contentBox gap-line">
      <div class="padding-15">
        <!-- 帖子内容 -->
        <div class="postingInfo">
          <div class="title-posting">{{ postingDetail.title }}</div>
          <div class="user-date">
            <div class="user-name">{{ postingDetail.source }}</div>
            <div class="date-readnum">
              <span>{{ postingDetail.releasetime }}</span>
              <span>阅读 {{ postingDetail.readcount }}</span>
            </div>
          </div>
          <span class="content" v-html="postingDetail.content"></span>
        </div>
      </div>
    </div>
    <!-- 评论 -->
    <comment></comment>
    <foot-box></foot-box>
  </div>
  <empty v-else-if="!hasdata">这篇资讯不见了，逛逛别的吧~</empty>
</template>
<script>
import { Detail, CommentList } from "api/posting";
import comment from "comps/comment";
import FootBox from "comps/FootBox";
import GoAppBtn from "comps/GoAppBtn";
import {
  reactive,
  ref,
  getCurrentInstance,
  onMounted,
  provide,
  computed,
} from "vue";
import { useRoute } from "vue-router";
export default {
  name: "postingDetail",
  components: { comment, FootBox, GoAppBtn },
  setup() {
    const { ctx } = getCurrentInstance();
    const route = useRoute();
    // route.params.id;
    let _ = {
      hasdata: ref(1),
      postingid: ref(""), // 帖子id
      postingDetail: ref({}), // 帖子详情
      comment: ref({}), // 评论
    };
    _.postingid.value = route.params.id;
    provide(
      "comment",
      computed(() => _.comment.value)
    );
    provide(
      "commentcount",
      computed(() => _.postingDetail.value.commentcount)
    );
    provide(
      "info",
      computed(() => _.postingDetail.value)
    );
    provide("id", route.params.id);
    provide("pagetype", "postingDetail");
    onMounted(() => {
      if (route.params.id) getDetail(route.params.id);
      else hasdata.value = 0;
    });
    const getDetail = (id) => {
      Detail({ id })
        .then((res) => {
          _.postingDetail.value = res;
          getCommentList(_.postingid);
          ctx.callApp({
            name: "postingDetail",
            id: poute.params.id || "",
          });
        })
        .catch((e) => {
          _.hasdata = 0;
        });
    };
    const getCommentList = () => {
      CommentList({ articleid: route.params.id, type: 1, size: 3 })
        .then((res) => {
          _.comment.value = res;
        })
        .catch((e) => {});
    };
    return {
      ..._,
      getDetail,
      getCommentList,
    };
  },
};
</script>
<style lang="scss" scoped>
.posting-detail {
  font-family: Arial, Helvetica, sans-serif;
  padding-bottom: 84 * $px;
}
.postingInfo {
  margin-bottom: 15 * $px;
  a {
    color: #28c369;
  }
  .title-posting {
    @include text(20 * $px, $color-23, left, 600);
    line-height: 30 * $px;
    margin-bottom: 15 * $px;
  }
  .user-date {
    @include flex(flex, space-between, center, nowrap);
    @include text(12 * $px, $color-64, left, 600);
    line-height: 17 * $px;
    margin-bottom: 25 * $px;
  }
  .content {
    margin: 10 * $px 0 14 * $px;
    word-break: break-word;
    @include text(15 * $px, $color-23, left, 600);
    line-height: 25 * $px;
  }
}
</style>
