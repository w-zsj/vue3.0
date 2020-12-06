<template>
  <div class="goods">
    <!-- 用户信息 -->
    <div class="who-send" @click="goapp">
      <div class="user">
        <div class="header">
          <img :src="info.headimgurl" alt="" />
        </div>
        <div>
          <div class="user-name">{{ info.nickname }}</div>
          <div class="txt">{{ info.counttext }}</div>
        </div>
      </div>
      <div class="right">
        <ico name="more-right"></ico>
      </div>
    </div>
    <!-- 商品信息 -->
    <div v-if="info && info.items && info.items.length">
      <div
        class="prod"
        v-for="(item, p) in info.items"
        :key="p"
        @click="goapp(item.sku)"
      >
        <div class="prod-pic">
          <img :src="item.picurl" alt="" />
        </div>
        <div class="prod-info">
          <div class="prod-info-name">
            {{ item.productname }}
          </div>
          <div class="prod-info-sku">
            {{ item.sku }}
            <span style="padding-left: 8px" v-if="info.items.length > 1">{{
              item.othercounttext
            }}</span>
          </div>
          <div class="prod-info-size" v-if="info.items.length > 1">
            <div
              class="_size"
              v-for="(subitem, index) in item.sizes"
              :key="index"
            >
              {{ subitem }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 尺码列表 -->
    <div class="size" v-if="info.items && info.items.length == 1">
      <div class="size-tit">尺码列表</div>
      <div class="size-list">
        <div
          class="size-list-item"
          v-for="(item, index) in info.items[0].sizes"
          :key="index"
        >
          <div v-if="item == '全码批发'">
            <div>全码</div>
            <div>批发</div>
          </div>
          <span v-else>{{ item }}</span>
        </div>
      </div>
    </div>
    <!-- 多少人正在求货 -->
    <div
      class="buy-num"
      @click="goapp"
      v-if="info.items && info.items.length == 1"
    >
      该商品还有{{ info.items[0].othercounttext }}去看看>>
    </div>

    <!-- 底部按钮 -->
    <div class="footer" @click="goapp">打开APP</div>
  </div>
</template>
<script>
import { getCurrentInstance, ref, reactive, onMounted } from "vue";
import { buyGoods } from "api/goods";
export default {
  setup() {
    const { ctx } = getCurrentInstance(),
      {
        $router,
        $router: {
          currentRoute: {
            value: { query },
          },
        },
      } = ctx;
    // console.log("当前实例", query);
    let info = ref({
      headimgurl: "",
      nickname: "",
      counttext: "",
    });
    let [params, type] = [query, ref(1)];

    document.title = type == 1 ? "求货详情" : "出货详情";

    const goapp = (sku) => {
      sku = typeof sku == "string" ? sku : "";
      console.log("sku--", sku, type.value);
      ctx.callApp({
        name: "shipmentDetail",
        id: sku || "",
        index: type.value,
      });
    };
    console.log("地址栏参数", params);

    onMounted(async () => {
      info.value = await buyGoods(params);
      console.log("info---", info);
    });

    return { info, type, goapp };
  },
};
</script>
<style scoped lang='scss'>
.goods {
  padding: 15 * $px;
  .who-send {
    @include text(12 * $px, rgba(255, 255, 255, 0.7));
    @include flex(flex, space-between, center, nowrap);
    padding: 15 * $px;
    background: #323e4f;
    border-radius: 8 * $px;
    margin-bottom: 4 * $px;
    .user {
      @include flex(flex, start, center, nowrap);
      .header {
        width: 40 * $px;
        height: 40 * $px;
        border-radius: 50%;
        overflow: hidden;
        @include flex(flex, start, center, nowrap);
        margin-right: 10 * $px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .user-name {
        @include text(15 * $px, #fff, left, 600);
      }
    }
  }

  .prod {
    @include flex(flex, space-between, flex-start, nowrap);
    padding: 16 * $px 0;
    border-bottom: 1px solid #f5f5f5;
    &-pic {
      width: 73 * $px;
      height: 73 * $px;
      border: 1px solid #c4c4c4;
      border-radius: 5 * $px;
      overflow: hidden;
      margin-right: 10 * $px;
      @include flex(flex, start, center);
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-info {
      flex: 1;
      min-height: 73 * $px;
      @include flex(column, space-between, flex-start, wrap);
      @include text(14 * $px, #232323, left, bold);
      &-name {
        @include ellipsis();
        margin-bottom: 12 * $px;
      }
      &-sku {
        @include text(12 * $px, #646464, left, 200);
        margin-bottom: 8 * $px;
      }
      &-size {
        @include flex(flex, flex-start, center, wrap);
        font-family: Arial, Helvetica, sans-serif;
        @include text(10 * $px, #696969, left, 500);
        ._size {
          padding: 2 * $px 8 * $px;
          background: rgba(225, 51, 27, 0.1);
          border-radius: 4 * $px;
          margin-right: 6 * $px;
          margin-bottom: 6 * $px;
        }
      }
    }
  }

  .size {
    @include text(18 * $px, #232323, left, bold);
    font-family: OswaldBold;
    padding-bottom: 5 * $px;
    border-bottom: 1px solid #f5f5f5;
    &-tit {
      padding: 12 * $px 0;
    }
    &-list {
      @include flex(flex, start, center);
      &-item {
        width: 60 * $px;
        height: 60 * $px;
        background: #f5f5f5;
        border-radius: 8 * $px;
        margin-bottom: 10 * $px;
        margin-right: 11 * $px;
        @include flex(flex, center, center);
        @include text(18 * $px, #232323, center, bold);
        &:nth-child(5n + 5) {
          margin-right: 0;
        }
        &.small {
          font-size: 16px;
        }
      }
    }
  }
  .buy-num {
    padding-top: 12 * $px;
    @include text(14 * $px, #646464, left);
  }
  .footer {
    position: fixed;
    left: 15 * $px;
    right: 15 * $px;
    bottom: 44 * $px;
    height: 44 * $px;
    background: #232323;
    border-radius: 6 * $px;
    @include flex(flex, center, center);
    @include text(16 * $px, #fff, center, bold);
  }
}
</style>
