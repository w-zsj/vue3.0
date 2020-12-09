<template>
  <div class="comment-box padding-15">
    <div class="header-title fontBold">
      全部评论
      <span v-if="commentcount > 0">({{ commentcount }})</span>
    </div>
    <div v-if="commentcount > 0">
      <div class="commentList">
        <div
          class="comment-item"
          v-for="(commentItem, commentIndex) in comment.list"
          :key="commentIndex"
        >
          <div class="user-pic" @click="goapp">
            <avatar :img="commentItem.headimgurl"></avatar>
          </div>
          <div class="comment-detl">
            <div class="name-attitude">
              <p class="user-name">{{ commentItem.nickname }}</p>
              <div class="user-attitude" @click="goapp">
                <span v-if="commentItem.favcount > 0">{{
                  commentItem.favcount
                }}</span>
                <ico
                  :name="
                    commentItem.favcount
                      ? 'posting-like-small'
                      : 'posting-like-gray-small'
                  "
                ></ico>
              </div>
            </div>
            <div class="comment-info">{{ commentItem.comment }}</div>
            <div class="date-reply">
              <div>{{ $filters.formatDate(commentItem.createtime) }}</div>
              <div class="reply-num">{{ commentItem.replys.length }} 回复</div>
            </div>
            <div
              class="replyBox"
              v-if="commentItem.replys && commentItem.replys.length > 0"
            >
              <div
                class="reply-item"
                :class="{
                  'last-child': replyIndex == commentItem.replys.length - 1,
                }"
                v-for="(replyItem, replyIndex) in commentItem.replys"
                :key="replyIndex"
                v-show="replyIndex < 2"
              >
                <div class="reply-user">
                  <span class="user_name">{{ replyItem.nickname }}</span>
                  <span>：{{ replyItem.comment }}</span>
                </div>
              </div>
              <div
                @click="goapp"
                class="replyBottom"
                v-if="commentItem.replys && commentItem.replys.length > 2"
              >
                <span>查看全部{{ commentItem.replys.length }}条回复</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div @click="goapp" class="bottomBox" v-if="commentcount > 3">
        <span>展开余下{{ commentcount - 3 }}条评论</span>
      </div>
      <div
        class="end flex-center"
        v-else-if="commentcount > 0 && commentcount <= 3"
      >
        — THE END —
      </div>
    </div>
    <div v-else>
      <NoContent></NoContent>
    </div>
  </div>
</template>
<script >
import { DateDiffFormat } from "@/utils/util";
import NoContent from "comps/NoContent";
import Avatar from "comps/Avatar";
import { computed, inject, provide, getCurrentInstance } from "vue";
export default {
  components: { NoContent, Avatar },
  props: ["comment", "commentcount", "id"],
  setup() {
    let comment = inject("comment");
    let commentcount = inject("commentcount");
    provide("sourceType", 4);
    let id = inject("id");
    let pagetype = inject("pagetype",'')
    const { ctx } = getCurrentInstance();
    // console.log("id--->>", id);
    const goapp = () => {
      ctx.callApp({
        name: pagetype,
        id: params.id || "",
      });
    };
    return {
      comment,
      commentcount,
    };
  },
};
</script>
<style lang="scss" scoped>
.comment-box {
  .header-title {
    @include text(18 * $px, $color-23, left, 600);
    padding: 15 * $px 0 10 * $px 0 * $px;
    line-height: 25 * $px;
    span {
      font-size: 14 * $px;
      padding-left: 5 * $px;
    }
  }
  .commentList {
    font-family: Arial, Helvetica, sans-serif;
    .comment-item {
      @include flex(flex, flex-start, top, nowrap);
      padding: 10 * $px 0;
      .user-pic {
        flex-shrink: 0;
        margin-right: 10 * $px;
        padding: 1 * $px;
        .avatar {
          width: 30 * $px;
          height: 30 * $px;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
      .comment-detl {
        width: 100%;
        flex-shrink: 1;
        .name-attitude {
          @include flex(flex, space-between, center, nowrap);
          .user-name {
            @include text(14 * $px, #3f79bd);
            height: 17 * $px;
            line-height: 17 * $px;
          }
          .user-attitude {
            @include flex(flex, flex-start, center, nowrap);
            span {
              display: inline-block;
              vertical-align: middle;
              height: 22 * $px;
              line-height: 26 * $px;
              color: $color-96;
              padding-right: 4 * $px;
              font-size: 12 * $px;
              font-weight: bold;
              &.act {
                color: #e6c36e;
              }
            }
          }
        }
        .comment-info {
          margin: 10 * $px 0;
          @include text(15 * $px, $color-23, left, 400);
          line-height: 21 * $px;
        }
        .date-reply {
          @include flex(flex, flex-start, center, nowrap);
          @include text(12 * $px, $color-64, left, 400);
          .reply-num {
            margin-left: 10 * $px;
            background: #f5f5f5;
            height: 22 * $px;
            line-height: 22 * $px;
            padding: 0 10 * $px;
            border-radius: 27 * $px;
          }
        }
      }
    }
  }

  .replyBox {
    margin-top: 12 * $px;
    background: #fafafa;
    border-radius: 6 * $px;
    padding: 10 * $px;
    .reply-item {
      margin-bottom: 6 * $px;
      &.last-child {
        margin-bottom: 0 * $px;
      }
      .reply-user {
        @include text(14 * $px, $color-23);
        line-height: 19 * $px;
        .user_name {
          color: #3f79bd;
        }
      }
    }
    .replyBottom {
      @include flex(flex, flex-start, center, nowrap);
      @include text(14 * $px, #3f79bd, left, 600);
      height: 17 * $px;
      margin-top: 6 * $px;
      line-height: 17 * $px;
    }
  }
}

.bottomBox {
  @include flex(flex, center, center, nowrap);
  @include text(14 * $px, #232323, left, 600);
  margin-bottom: 20 * $px;
  span {
    span {
      margin: 0;
      color: #232323;
      font-weight: bold;
    }
  }
}

.end {
  height: 60 * $px;
  font-size: 13 * $px;
  font-weight: 400;
  text-align: left;
  color: #505050;
  line-height: 18 * $px;
  background: #232323;
}
</style>
