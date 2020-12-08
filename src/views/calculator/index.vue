<template>
  <div class="calculator-box">
    <div class="top-plats">
      <div
        class="top-plats-item"
        v-for="(item, index) in platformList"
        :key="item.id"
        :class="[platformId == item.id ? 'curr-tab' : '']"
        @click="switchTab(item, index)"
        v-show="item.id != 13 && item.id != 14"
      >
        {{ item.name }}
      </div>
      <div class="tabs-icon">
        <img
          class="ico-class"
          @click="showLablePop"
          src="../../assets/img/ico-class.png"
        />
      </div>
    </div>
    <div class="tabs-class">
      <div
        v-for="(item, index) in tabClasses"
        :key="index"
        class="tabs-class-item"
        :class="[currClass == index ? 'selected' : '']"
        @click="switchClass(index)"
      >
        {{ item }}
      </div>
    </div>
    <div v-show="currClass == 1" class="prokey-search">
      <div class="tit_prokey">输入商品货号</div>
      <div class="flex-btwn search-por">
        <div class="prokey_inptbox">
          <input type="text" class="prokey_inpt" v-model="prokey" />
          <img
            v-if="prokey"
            class="ico-close"
            mode="aspectFit"
            src="../../assets/img/ico_close.png"
            @click="clearProkey()"
          />
        </div>
        <div class="search_butn" @click="getProdLows">查询</div>
      </div>
      <div class="size-lists">
        <div
          v-for="item in sizeLists"
          :key="item.size"
          class="list-item flex-center flex-col"
        >
          <div class="list-item-size" :class="item.minprice ? '' : 'no_price'">
            {{ item.size }}
          </div>
          <div>{{ item.minprice || "---" }}</div>
          <div>{{ item.incomeprice || "---" }}</div>
        </div>
      </div>
    </div>
    <div v-show="currClass == 0">
      <div class="calcu">
        <div class="calcu-tech">
          <div>技术服务费(%)</div>
          <div class="calcu-tech-list">
            <div
              v-if="currRadio == 1"
              class="font-Oswald"
              @click="showRatemodl"
            >
              {{ myselfRate || "0" }}%
            </div>
            <div class="rate_picker" v-else>
              <div class="pick_inpt" @click="showServiceRate">
                <div class="font-Oswald ft_size48">
                  {{ serviceRates[techIndex] }}
                </div>
                <div class="triangle_down" style="margin-left: 12px"></div>
              </div>
            </div>
          </div>
          <div class="calcu-tech-radio">
            <div
              v-for="item in radioLists"
              :key="item.value"
              class="radio_item"
              @click.stop="radioChange(item)"
            >
              <div
                class="circle_img"
                :class="{ checked: currRadio == item.value }"
              ></div>
              <div>{{ item.name }}</div>
            </div>
          </div>
        </div>
        <div class="slash-line"></div>
        <div class="calcu-tech" @click="showProducttype">
          <div>商品类型</div>
          <div class="calcu-tech-list" v-if="platformId == 3">
            <div class="rate_picker">
              <div class="pick_inpt">
                <div class="font-Oswald ft_size48">
                  {{ prodTypeList[typeIndex].value }}
                </div>
                <div class="triangle_down" style="margin: 8px 0 0 12.5px"></div>
              </div>
            </div>
          </div>
          <div v-else class="calcu-tech-list only_prodtype font-Oswald">
            {{ prodTypeList[0].value }}
          </div>
        </div>
      </div>
      <rateUnit v-if="rateInfo && rateInfo.servicerate"></rateUnit>
      <!--  -->
    </div>
    <van-popup
      v-model:show="selfRatePopup"
      position="bottom"
      transition="popup-fade"
      style="borderradius: 12px"
    >
      <div class="popup-ratebox">
        <div class="popup-ratebox-title">自定义费率</div>
        <div class="popup-ratebox-cont">
          <div class="popup-ratebox-input">
            <input
              type="value"
              v-model="selfRate"
              placeholder="请输入自定义费率(%)"
            />
          </div>
          <div
            class="popup-ratebox-confirm"
            :class="selfRate ? 'has-val' : ''"
            @click="confirmRate"
          >
            确认
          </div>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model:show="serviceRatePopup"
      position="bottom"
      transition="popup-fade"
      round
    >
      <van-picker
        :class="{ ipx: $root.ipx }"
        :columns="serviceRates"
        title="请选择技术服务费"
        @cancel="closeProductSwitch('isVisible3')"
        @confirm="confirmBindTechChange"
      ></van-picker>
    </van-popup>
    <van-popup
      v-model:show="producttypePopup"
      position="bottom"
      transition="popup-fade"
      round
    >
      <van-picker
        :class="{ ipx: $root.ipx }"
        :columns="prodTypeListData"
        title="请选择商品类型"
        @cancel="closeProductSwitch('isVisible3')"
        @confirm="confirmProduct"
      >
      </van-picker>
    </van-popup>
    <van-popup
      v-model:show="listplatPopup"
      position="top"
      transition="popup-fade"
      round
    >
      <div class="top-plats">
        <!-- <nut-scroller> -->
        <div
          class="top-plats-item"
          v-for="(item, index) of platformList"
          :key="item.id"
          :class="[platformId == item.id ? 'curr-tab' : '']"
          @click="switchTab(item, index)"
        >
          {{ item.name }}
        </div>
        <!-- </nut-scroller> -->
        <div class="tabs-icon">
          <img
            class="ico-class"
            @click="showLablePop"
            src="../../assets/img/ico-class.png"
          />
        </div>
      </div>
      <div class="list-plats">
        <div
          class="list-plats-item"
          v-for="(item, index) of platformList"
          :key="item.id"
          :class="[platformId == item.id ? 'curr-tab' : '']"
          @click="switchTab(item, index)"
          v-show="item.id != 13 && item.id != 14"
        >
          {{ item.name }}
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import rateUnit from "comps/RateUnit.vue";
import { CalculatePrice, PlatformList, GetSizeLowprice } from "api/calculator";
import {
  getCurrentInstance,
  reactive,
  ref,
  onMounted,
  provide,
  computed,
  triggerRef,
  toRefs,
  watch,
} from "vue";
import { Toast } from "vant";
export default {
  name: "CalculatorIndex",
  components: { rateUnit },
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

    let data = {
      platformId: ref(""),
      currProdTypeid: ref(""),
      platformList: ref([]),
      selfRate: ref(""),
      myselfRate: ref(""),
      prokey: ref(""),
      rateInfo: ref({}),
      currClass: ref(0),
      techIndex: ref(0),
      sharetype: ref("stock"),
      serviceRates: ["5%", "3.5%", "2%", "1.8%", "1.2%"],
      currRadio: ref(0),
      radioLists: [
        { value: "0", name: "默认" },
        { value: "1", name: "自定义" },
      ],
      tabClasses: ["出价", "货号"],
      typeIndex: ref(0),
      sizeLists: reactive([]),
      prodTypeList: [
        { label: 1, value: "常规球鞋" },
        { label: "-1", value: "拖鞋童鞋" },
        { label: "-2", value: "其他商品" },
      ],
      prodTypeListData: reactive([]),
      selfRatePopup: ref(false),
      serviceRatePopup: ref(false),
      producttypePopup: ref(false),
      listplatPopup: ref(false),
    };
    let serFeeRate = ref("");

    document.title = "计算器";

    const showLablePop = () => {
      data.listplatPopup.value = !data.listplatPopup.value;
    };
    const getPlatformlist = async () => {
      let temList = (await PlatformList()) || [];
      data.platformList.value = temList;
      console.log("platformList--", data.platformList);
      data.platformId.value = temList[0].id || "";
      data.currProdTypeid.value = data.prodTypeList[0].label;
      getRateDetl();
    };
    const getRateDetl = (id, type) => {
      let para = {
        platform: data.platformId.value,
        type: data.currProdTypeid.value,
      };

      CalculatePrice(para).then((res) => {
        if (res) {
          data.rateInfo.value = res;
          serFeeRate.value = res.servicerate;
          let temRate = (res.servicerate * 100).toFixed(2);
          let temServiec = "";
          data.serviceRates.forEach((it, index) => {
            temServiec = it.split("%")[0];
            if (parseFloat(temServiec) == temRate) {
              data.techIndex.value = index;
            }
          });
        }
      });
    };
    // 切换平台
    const switchTab = (item, index) => {
      data.currTab = index;
      data.currRadio.value = 0;
      data.platformId.value = item.id;
      data.currProdTypeid.value = data.prodTypeList[0].label;
      if (data.currClass.value == 1) {
        getProdLows();
      } else {
        getRateDetl();
      }
    };
    const showProducttype = () => {
      data.producttypePopup.value = true;
    };
    const showServiceRate = () => {
      data.serviceRatePopup.value = true;
    };
    const showRatemodl = () => {
      data.selfRatePopup.value = true;
    };
    const confirmBindTechChange = (e) => {
      let index = data.serviceRates.findIndex((i) => i == e);
      data.techIndex.value = index >= 0 ? index : 0;
      let temRate = data.serviceRates[index].split("%")[0];
      serFeeRate.value = parseFloat((temRate / 100).toFixed(3));
      data.serviceRatePopup.value = false;
    };
    const closeProductSwitch = (e) => {
      console.log("取消", e);
      data.producttypePopup.value = false;
      data.serviceRatePopup.value = false;
    };
    const confirmProduct = (item) => {
      console.log(item);
      let index = data.prodTypeList.findIndex((i) => i.value == item) || 0;
      // console.log("确定", item, index);
      data.currProdTypeid.value = data.prodTypeList[index].label;
      data.typeIndex.value = index >= 0 ? index : 0;
      data.currRadio.value = 0;
      data.producttypePopup.value = false;
      getRateDetl();
    };
    const radioChange = (item) => {
      let _ = this;
      data.currRadio.value = item.value;
      if (item.value == 1) {
        data.selfRatePopup.value = true;
      } else {
        serFeeRate.value = data.rateInfo.value.servicerate;
      }
    };
    const formatDecimal = (num, type = 3) => {
      num = num.toString();
      let index = num.indexOf(".");
      if (index !== -1) {
        num = num.substring(0, type + index + 1);
      } else {
        num = num.substring(0);
      }
      return parseFloat(num).toFixed(type);
    };
    const NumberFotOne = function (val) {
      let res = parseInt(val * 10) / 10; // 保留两位、三位小数 同理
      return res;
    };
    const confirmRate = () => {
      let temval = data.selfRate.value;
      if (temval == "" || temval == null) {
        Toast("请输入数字");
        data.selfRate.value = null;
        return;
      }
      if (!isNaN(temval)) {
        let temrate = temval / 100;
        serFeeRate.value = parseFloat(data.formatDecimal(temval, 1)) / 100;
        data.myselfRate.value = data.NumberFotOne(temval);
        data.selfRatePopup.value = false;
      } else {
        Toast("请输入数字");
        data.selfRate.value = 0;
      }
    };
    const switchClass = (index) => {
      data.currClass.value = index;
      data.sharetype.value = index == 1 ? "prokey" : "stock";
    };
    const clearProkey = function () {
      data.prokey.value = null;
      data.sizeLists = [];
    };
    const getProdLows = () => {
      let prokey = data.prokey.value.trim();
      console.log(prokey);
      if (prokey == "") {
        Toast("请输入商品货号");
      } else {
        let para = {
          platform: data.platformId.value,
          sku: prokey,
        };
        GetSizeLowprice(para)
          .then((res) => {
            data.sizeLists = res;
          })
          .catch((e) => {
            if (e.code == 200) {
              Toast("请输入正确的商品货号");
            }
          });
      }
    };
    onMounted(() => {
      getPlatformlist();
      data.prodTypeList.forEach((i) => {
        data.prodTypeListData.push(i.value);
      });
    });
    provide(
      "rateInfo",
      computed(() => data.rateInfo.value)
    );
    return {
      ...data,
      serFeeRate,
      showLablePop,
      getPlatformlist,
      getRateDetl,
      switchTab,
      showProducttype,
      showServiceRate,
      showRatemodl,
      confirmBindTechChange,
      closeProductSwitch,
      confirmProduct,
      radioChange,
      formatDecimal,
      NumberFotOne,
      confirmRate,
      switchClass,
      clearProkey,
      getProdLows,
    };
  },
};
</script>

<style lang="scss" scoped>
// .top-plats::-webkit-scrollbar {
//   display: none;
// }
.van-picker {
  &.ipx {
    padding-bottom: 34px;
  }
}
.triangle_down {
  display: inline-block;
  width: 0;
  height: 0;
  border-width: 4px;
  margin-left: 3.5px;
  border-style: solid;
  border-color: #232323 transparent transparent transparent;
}
.calculator-box {
  position: relative;
  .top-plats {
    @include flex(flex, flex-aic, center, nowrap);
    overflow-x: auto;
    height: 40px;
    padding: 0 60px 0 12px;
    overflow-x: scroll;
    &-item {
      margin: 0 * $px 10 * $px;
      text-align: center;
      font-size: 15 * $px;
      color: #646464;
      word-break: keep-all;
      height: 30px;
      line-height: 30px;
      margin-top: 10px;
      &.curr-tab {
        color: #232323;
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 500;
        border-bottom: 2px solid #232323;
      }
    }
    .tabs-icon {
      position: absolute;
      right: 0;
      top: 5px;
      width: 50px;
      height: 40px;
      @include flex(flex, center, center);
      padding-right: 8px;
      background: linear-gradient(
        270deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 1) 85%,
        rgba(255, 255, 255, 0) 100%
      );
      .ico-class {
        width: 20px;
        height: 20px;
      }
    }
  }
  .list-plats {
    @include flex(flex, flex-aic, center);
    background-color: #fff;
    width: 100%;
    padding: 15 * $px;
    border-radius: 0px 0px 12px 12px;
    &-item {
      width: 76 * $px;
      height: 30 * $px;
      margin: 0 10 * $px 10 * $px 0;
      line-height: 30 * $px;
      text-align: center;
      font-weight: 500;
      font-size: 14 * $px;
      color: #646464;
      border-radius: 4 * $px;
      background: #f5f5f5;
      &.curr-tab {
        background: #232323;
        color: #fff;
      }
    }
  }
  .plats-box {
    position: absolute;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 40 * $px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
  }
  .tabs-class {
    @include flex(flex, space-between, center, nowrap);
    height: 44 * $px;
    margin: 12 * $px 20 * $px 0;
    background-color: #f5f5f5;
    border-radius: 4 * $px;
    padding: 4 * $px;
    &-item {
      @include flex(flex, center, center, nowrap);
      width: 100%;
      text-align: center;
      background-color: #f5f5f5;
      height: 100%;
      color: #969696;
      &.selected {
        background-color: $color-white;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        color: $color-23;
        font-size: 15 * $px;
      }
    }
  }
  .prokey-search {
    color: $color-23;
    font-size: 15px;
    padding: 20px 20px 0;
    .tit_prokey {
      font-size: 15px;
      color: $color-23;
    }
    .search-por {
      margin: 12px 0 25px;
      .prokey_inptbox {
        position: relative;
        width: 100%;
        margin-right: 44rpx;
        .prokey_inpt {
          display: block;
          height: 37px;
          font-family: OswaldBold;
          font-weight: 600;
          font-size: 24px;
          border-bottom: 1px solid $color-96;
          width: 100%;
          flex-shrink: 1;
        }
        .ico-close {
          position: absolute;
          right: 0;
          top: 5.5px;
          z-index: 3;
          width: 26px;
        }
      }
      .search_butn {
        padding: 0 12px;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        color: $color-white;
        border-radius: 2px;
        flex-shrink: 0;
        background: linear-gradient(
          135deg,
          rgba(73, 73, 73, 1) 0%,
          rgba(35, 35, 35, 1) 100%
        );
      }
    }
    .size-lists {
      @include flex(flex, flex-aic, center, wrap);
      .list-item {
        border-radius: 2px;
        background-color: #f5f5f5;
        width: 77px;
        height: 77px;
        color: #686868;
        font-size: 12px;
        margin: 9px 9px 0 0;
        &:nth-child(4n) {
          margin-right: 0;
        }
        &-size {
          color: $color-23;
          font-size: 20px;
          &.no_price {
            color: #969696;
          }
        }
        &.curr-selected {
          background: linear-gradient(
            135deg,
            rgba(73, 73, 73, 1) 0%,
            rgba(35, 35, 35, 1) 100%
          );
          color: $color-white;
          .list-item-size {
            color: $color-white;
          }
        }
      }
    }
  }
  .calcu {
    @include flex(flex, space-between, flex-start, nowrap);
    color: #232323;
    font-size: 15px;
    padding: 15px 0;
    margin: 0 24px;
    border-bottom: 1px solid #efefef;
    .slash-line {
      width: 1px;
      height: 54px;
      margin-top: 10px;
      background: linear-gradient(
        360deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.4) 55%,
        rgba(0, 0, 0, 0) 100%
      );
    }
    &-tech {
      @include flex(column, flex-start, flex-start);
      width: 50%;
      &:last-child {
        padding-left: 24px;
      }
      .rate_picker {
        @include flex(row, flex-start, center);
        .ft_size48 {
          padding: 0;
        }
        .pick_inpt {
          @include flex(row, flex-start, center);
          width: 120px;
          height: 30px;
          position: relative;
          font-size: 24px;
        }
      }
      &-list {
        font-size: 24px;
        margin: 10px 0 10px;
        &.only_prodtype {
          @include flex(flex, flex-start, center);
          height: 25px;
          font-size: 24px;
        }
      }
      &-radio {
        @include flex(flex, flex-start, center);
        font-size: 12px;
        .radio_item {
          @include flex(flex, center, center);
          margin-right: 20px;
          .circle_img {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #d8d8d8;
            margin-right: 5px;
            &.checked {
              border: 3px solid #3e79e9;
              background-color: #fff;
            }
          }
        }
      }
    }
  }
  .popup-ratebox {
    width: 290px;
    height: 162px;
    background-color: #fff;
    padding: 17px 15px 15px;
    margin: 0 auto;
    &-title {
      color: #232323;
      font-size: 18px;
      text-align: center;
      margin-bottom: 15px;
    }
    &-input input {
      position: relative;
      width: 100%;
      border: 1px solid #d8d8d8;
      color: #232323;
      background-color: #f5f5f5;
      border-radius: 8px;
      font-size: 16px;
      height: 30px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      margin-bottom: 10px;
    }
    &-confirm {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 8px;
      color: #fff;
      font-size: 16px;
      background: #d8d8d8;
      &.has-val {
        background: #232323;
      }
    }
  }
  .servicerate-popup {
    width: 100vw;
    div {
      text-align: center;
      padding: 5px 0;
      font-size: 14px;
      color: $color-23;
      height: 40 * $px;
      @include flex(flex, center, center);
      &.selected {
        background: #3e79e9;
        color: $color-white;
      }
    }
  }
}
</style>
