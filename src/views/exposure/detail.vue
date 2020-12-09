<template>
  <div class="exposure-detail" v-if="hasdata == 1">
    <div class="contentBox gap-line">
      <div class="padding-15">
        <div class="title_exposure">{{ exposureDetail.title }}</div>
        <div class="userInfo">
          <div class="userInfoLeft">
            <avatar :img="exposureDetail.headimgurl"></avatar>
          </div>
          <div class="userInfoCenter" @click="goapp">
            <p class="user-name">{{ exposureDetail.username }}</p>
            <p class="subtxt">
              <span>{{ $filters.formatDate(exposureDetail.releasetime) }}</span>
              <span>阅读 {{ exposureDetail.readcount || 0 }}</span>
            </p>
          </div>
          <div class="userInfoRight" @click="goapp">
            <p class="fontBold">关注</p>
          </div>
        </div>
        <!-- 帖子内容 -->
        <div class="exposureInfo">
          <span class="content" v-html="exposureDetail.content"></span>
        </div>
      </div>
    </div>

    <!-- 评论 -->
    <div class>
      <comment></comment>
    </div>

    <foot-box></foot-box>
  </div>
  <empty v-else-if="!hasdata">这篇资讯不见了，逛逛别的吧~</empty>
</template>
<script>
import { Detail } from "api/exposure";
import { CommentList } from "api/posting";
import comment from "comps/comment";
import FootBox from "comps/FootBox";
import GoAppBtn from "comps/GoAppBtn";
import avatar from "comps/Avatar";
import {
  reactive,
  ref,
  getCurrentInstance,
  onMounted,
  provide,
  computed,
} from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "exposureDetail",
  components: { comment, avatar, FootBox, GoAppBtn },

  setup() {
    // 获取实例
    const instance = getCurrentInstance();
    const {
      ctx,
      ctx: {
        $router,
        $router: {
          currentRoute: {
            value: { params },
          },
        },
      },
    } = instance;
    // const route = useRoute();
    // route.params.id;
    // document.title = "求/出货上传";
    console.log("地址栏参数", params);

    let _ = {
      hasdata: ref(1),
      exposureid: ref(""), // 曝光台帖子id
      exposureDetail: ref({}), // 帖子详情
      comment: ref({}), // 评论
    };
    provide(
      "comment",
      computed(() => _.comment.value)
    );
    provide(
      "commentcount",
      computed(() => _.exposureDetail.value.commentcount)
    );
    provide(
      "info",
      computed(() => _.exposureDetail.value)
    );
    provide("id", params.id);
    provide("pagetype", "exposureDetail");

    const goapp = () => {
      ctx.callApp({
        name: "exposureDetail",
        id: params.id || "",
      });
    };
    onMounted(() => {
      _.exposureid.value = params.id;
      if (params.id) getDetail(params.id);
    });

    const getDetail = (id) => {
      Detail({ id })
        .then((res) => {
          _.exposureDetail.value = res;
          getCommentList(id);
        })
        .catch((e) => {
          _.hasdata.value = 0;
        });
    };
    const getCommentList = (exposureid) => {
      CommentList({ articleid: exposureid, type: 2, size: 3 })
        .then((res) => {
          _.comment.value = res;
        })
        .catch((e) => {});
    };

    return {
      ..._,
      getDetail,
      getCommentList,
      goapp,
    };
  },
};
</script>
<style lang="scss" scoped>
.exposure-detail {
  font-family: Arial, Helvetica, sans-serif;
  padding-bottom: 84 * $px;
  .title_exposure {
    @include text(20 * $px, $color-23, left, 600);
    line-height: 30 * $px;
    margin: 15 * $px 0;
  }
  .userInfo {
    @include flex(flex, space-between, center, nowrap);
    height: 40 * $px;
    margin-bottom: 10 * $px;
    .userInfoLeft {
      margin-right: 10 * $px;
      height: 40 * $px;
      width: 40 * $px;
      padding: 1 * $px;
      border-radius: 100%;
      .avatar {
        height: 40 * $px;
        width: 40 * $px;
        img {
          display: block;
        }
      }
    }
    .userInfoCenter {
      flex: 1;
      font-weight: 400;
      .user-name {
        @include text(13 * $px, $color-23);
        height: 20 * $px;
        line-height: 20 * $px;
      }
      .subtxt {
        @include text(12 * $px, $color-96);
        height: 18 * $px;
        line-height: 18 * $px;
        span {
          display: inline-block;
          margin-right: 15 * $px;
        }
      }
    }
    .userInfoRight {
      @include flex(flex, flex-end, center, nowrap);
      width: 48 * $px;
      height: 38 * $px;
      p {
        @include text(13 * $px, $color-white, center, 600);
        height: 28 * $px;
        line-height: 28 * $px;
        width: 50 * $px;
        background: linear-gradient(360deg, #e1331b 0%, #ff9587 100%);
        border-radius: 41 * $px;
        font-family: Arial, Helvetica, sans-serif;
      }
    }
  }
}
.exposureInfo {
  margin-bottom: 15 * $px;
  a {
    color: #28c369;
  }
  .content {
    margin: 10 * $px 0 14 * $px;
    word-break: break-word;
    color: #ffffff;
    font-size: 15 * $px;
    line-height: 25 * $px;
  }
}
</style>
