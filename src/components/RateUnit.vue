<template>
  <div class="rate-unit">
    <div class="price-detail">
      <div class="current-price gap-liner">
        <div class="current-price-name">
          当前价格{{ isReadonly ? "" : "(￥)" }}
        </div>
        <div class="current-price-inpt" v-if="isReadonly">
          <div class="symbol-price">￥</div>
          <div class="curr-price">{{ currPrice || 0 }}</div>
        </div>
        <input
          v-else
          class="current-price-inpt"
          type="number"
          v-model="currentPrice"
          @input="changeInptVal"
        />
      </div>
      <div class="other-price">
        <div class="other-price-list gap-liner">
          <div>
            技术服务费{{ $filters.techRateFormat(serRate) }}%{{ minMax }}
          </div>
          <div class="other-price-list-number">
            ￥{{ $filters.NumFormat(techPrice) }}
          </div>
        </div>
        <div class="other-price-list gap-liner">
          <div>转账服务费{{ $filters.floatPercent(transRate) }}%</div>
          <div class="other-price-list-number">
            ￥{{ $filters.NumFormat(transPrice) }}
          </div>
        </div>
        <div class="other-price-list gap-liner">
          <div>查验费</div>
          <div class="other-price-list-number">
            ￥{{ rateInfo.checkfee || 0 }}
          </div>
        </div>
        <div class="other-price-list gap-liner">
          <div>鉴别费</div>
          <div class="other-price-list-number">
            ￥{{ rateInfo.identifyfee || 0 }}
          </div>
        </div>
        <div class="other-price-list gap-liner">
          <div>包装服务费</div>
          <div class="other-price-list-number">
            ￥{{ rateInfo.packfee || 0 }}
          </div>
        </div>
        <div class="other-price-list">
          <div>总费用</div>
          <div class="other-price-list-number">
            ￥{{
              $filters.NumFormat(
                currentPrice == 0 && !isReadonly
                  ? 0
                  : techPrice + transPrice + otherFee
              )
            }}
          </div>
        </div>
        <div class="other-price-total">
          <div>预计到手价</div>
          <div class="handprice">
            <div class="ft_size36">￥</div>
            <div v-if="isReadonly" class="other-price-total-number font-Oswald">
              {{
                $filters.NumFormat(
                  currPrice - (techPrice + transPrice + otherFee)
                )
              }}
            </div>
            <div v-else class="other-price-total-number font-Oswald">
              {{
                $filters.NumFormat(
                  currentPrice - (techPrice + transPrice + otherFee)
                )
              }}
            </div>
          </div>
        </div>
        <div class="other-price-total">
          <div class="color-red self-price">
            我司到手价
            <div style="fontsize: 10 * $px">
              (我司优惠费率{{ $filters.floatPercent(sneakerRate) }}%)
            </div>
          </div>
          <div class="color-red self-comp-price">
            <div>￥</div>
            <div v-if="isReadonly">
              {{
                $filters.NumFormat(
                  currPrice - (transPrice + otherFee + compaPrice)
                )
              }}
            </div>
            <div v-else>
              {{
                $filters.NumFormat(
                  currentPrice - (transPrice + otherFee + compaPrice)
                )
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, computed, ref, reactive, watchEffect } from "vue";
import { Toast } from "vant";
export default {
  props: {
    currPrice: { type: [Number, String], default: 0 },
    rateInfo: {
      type: Object,
    },
    servicerate: { type: [Number, String] },
    isReadonly: { type: Boolean, default: false },
    // selfRate:{type: [Number,String],default:'0.035'}
  },
  setup(props) {
    let rateInfo = props.rateInfo || inject("rateInfo");
    let servicerate = props.servicerate ||  inject("servicerate");
    let currPrice = props.currPrice;
    let isReadonly = props.isReadonly;
    let currentPrice = reactive(null);
    watchEffect(() => {
      console.log("rateInfo--", rateInfo);
    });

    const otherFee = computed(() => {
      let allInfo = rateInfo;
      let checkfee = allInfo.checkfee || 0;
      let identifyfee = allInfo.identifyfee || 0;
      let packfee = allInfo.packfee || 0;
      let allSum = checkfee + identifyfee + packfee;
      return parseFloat(allSum.toFixed(2));
    });
    const sneakerRate = computed(() => {
      return rateInfo.myservicerate || 0;
    });
    const transRate = computed(() => {
      return rateInfo.transferrate || 0;
    });
    const maxFee = computed(() => {
      return rateInfo.maxskillfee || "Infinity";
    });
    const minFee = computed(() => {
      return rateInfo && rateInfo.lowerskillfee ? rateInfo.lowerskillfee : 0;
    });
    const serRate = computed(() => {
      let tem = servicerate || 0;
      return tem == 0 ? 0 : tem.toFixed(3);
    });
    const minMax = computed(() => {
      let min = rateInfo && rateInfo.lowerskillfee ? rateInfo.lowerskillfee : 0;
      let max =
        rateInfo && rateInfo.maxskillfee ? rateInfo.maxskillfee : "Infinity";
      let temStr = "";
      if (min == 0 && max == "Infinity") {
        temStr = "";
      } else if (max != "Infinity" && min != 0) {
        temStr = "(" + min + "~" + max + ")";
      } else if (max == "Infinity" && min != 0) {
        temStr = "(最低" + min + ")";
      } else {
        temStr = "(最高" + max + ")";
      }
      return temStr;
    });
    const techPrice = computed({
      get: function () {
        let temprice = isReadonly ? currPrice : currentPrice;

        if (temprice < 0) {
          return 0;
        } else {
          if (maxFee == "Infinity") {
            return temprice * serRate < minFee ? minFee : temprice * serRate;
          } else {
            return temprice * serRate > maxFee
              ? maxFee
              : temprice * serRate < minFee
              ? minFee
              : temprice * serRate;
          }
        }
      },
      set: function (val) {
        console.log(val);
        // this.currentPrice = val
      },
    });
    const compaPrice = computed({
      get: function () {
        let temprice = isReadonly ? currPrice : currentPrice;
        let temPri = 0;
        if (temprice < 0) {
          return 0;
        } else {
          if (maxFee == "Infinity") {
            temPri =
              temprice * sneakerRate < minFee ? minFee : temprice * sneakerRate;
          } else {
            temPri =
              temprice * sneakerRate > maxFee
                ? maxFee
                : temprice * sneakerRate < minFee
                ? minFee
                : temprice * sneakerRate;
          }
          return parseFloat(temPri.toFixed(2));
        }
      },
      set: function (val) {
        console.log(val);
        // this.currentPrice = val
      },
    });
    const transPrice = computed({
      get: function () {
        let temprice = isReadonly ? currPrice : currentPrice;
        if (temprice < 0) {
          return 0;
        } else {
          return transRate * temprice;
        }
      },
      set: function (val) {
        // this.currentPrice = val
      },
    });

    const changeInptVal = (e) => {
      console.log(e.target.value);
      let currPrice = e.target.value;
      if (currPrice < 0) {
        Toast("请输入整数");
        currentPrice = 0;
      } else {
        currentPrice = Number(currPrice);
      }
    };
    return {
      currentPrice,
      rateInfo,
      servicerate,
      otherFee,
      sneakerRate,
      transRate,
      maxFee,
      minFee,
      serRate,
      minMax,
      techPrice,
      compaPrice,
      transPrice,
      changeInptVal,
    };
  },
};
</script>

<style lang="scss" scoped>
.gap-liner {
  position: relative;
  &::after {
    content: "";
    height: 1px;
    background: #efefef;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    transform: scaleY(0.5);
  }
}
.price-detail {
  margin: 25px 24px;
  .current-price {
    position: relative;
    padding-bottom: 16px;
    margin-bottom: 5px;
    &::after {
      content: "";
      background: #989898;
    }
    color: $color-23;
    &-name {
      position: absolute;
      display: inline-block;
      height: 34px;
      left: 0;
      top: 50%;
      margin-top: -17px;
      z-index: 1;
      font-size: 15px;
    }
    &-inpt {
      text-align: right;
      font-size: 24px;
      height: 34px;
      padding-left: 85px;
      font-family: OswaldBold;
      font-weight: 600;
    }
    .symbol-price {
      font-size: 18px;
    }
    .curr-price {
      font-size: 24px;
    }
  }
  .other-price {
    &-list {
      @include flex(flex, space-between, center, nowrap);
      padding: 15px 0;
      font-size: 15px;
      color: #686868;
      &.non-border-botm {
        border-bottom: none;
      }
      &-number {
        color: $color-23;
        font-weight: 600;
      }
    }
    &-total {
      @include flex(flex, space-between, center, nowrap);
      font-size: 15px;
      color: $color-23;
      font-weight: 600;
      padding: 10px 0;
      &-number {
        font-size: 24px;
      }
      .handprice {
        @include flex(flex, flex-end, center, nowrap);
        .ft_size36 {
          font-size: 18px;
        }
      }
      .color-red {
        font-size: 15px;
        color: #ec0000;
        &.self-price {
          @include flex(flex, baseline, center, nowrap);
          font-size: 12px;
          > div {
            font-size: 10 * $px;
          }
        }
        &.self-comp-price {
          font-size: 12px;
          @include flex(flex, baseline, center, nowrap);
        }
      }
    }
  }
}
</style>
