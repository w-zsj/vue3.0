<template>
  <div class="constainer">
    <div class="constainer-header">
      <div class="shipment-box">
        <div class="shipment-item">
          <div class="left-cont">类型选择：</div>
          <div class="right-cont style_ship">
            <span :class="stype == 1 ? 'choosen' : ''" @click="changeType(1)"
              >求货</span
            >
            <span :class="stype == 2 ? 'choosen' : ''" @click="changeType(2)"
              >出货</span
            >
          </div>
        </div>
        <div class="shipment-item top_table">
          <div class="left-cont">新增商品：</div>
          <div class="right-cont product_ship">
            <input placeholder="请输入货号" v-model="prokey" />
            <input
              class="size-inpt"
              placeholder="请输入尺码，用英文逗号隔开"
              v-model="sizes"
            />
            <button
              class="base_butn"
              style="margin: 0 0 0 0"
              @click="inportShip"
            >
              添加
            </button>
          </div>
        </div>
        <div class="shipment-item top_table">
          <div class="left-cont">求/出货单：</div>
          <div class="right-cont table_ship">
            <table class="order_table">
              <thead>
                <tr>
                  <th
                    v-for="(item, index) in columns"
                    :key="index"
                    :width="item.width"
                  >
                    {{ item.title }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="dataSource.length == 0">
                  <td colspan="5">
                    <NoContent></NoContent>
                  </td>
                </tr>
                <tr v-else v-for="(item, index) in dataSource" :key="index">
                  <td width="120" align="center">{{ item.sku }}</td>
                  <td width="200" align="center">{{ item.name }}</td>
                  <td width="120" align="center">
                    <img class="prod_img" :src="item.picurl" alt="" />
                  </td>
                  <td width="120" align="center">
                    {{ $filters.formateSize(item.list) }}
                  </td>
                  <td width="120" align="center">
                    <span class="delt_span" @click="deleteShip(index)"
                      >删除</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="shipment-item">
          <div class="left-cont"></div>
          <div class="right-cont">
            <button
              class="base_butn"
              :disabled="disabledLoading"
              @click="submitShip"
            >
              提交
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkShipment, addShipment } from "api/shipment.js";
import NoContent from "comps/NoContent";
import { reactive, ref, getCurrentInstance, onMounted, provide } from "vue";
import { Toast } from "vant";
export default {
  name: "ShipmentIndex",
  components: { NoContent },
  setup() {
    //   初始化数据
    let _ = {
      stype: ref(1),
      prokey: ref(""),
      sizes: ref(""),
      dataSource: reactive([]),
      columns: [
        { title: "货号", width: 120 },
        { title: "商品名称", width: 200 },
        { title: "图片", width: 120 },
        { title: "尺码", width: 120 },
        { title: "操作", width: 120 },
      ],
      loading: ref(false),
      disabledLoading: ref(false),
      currUid: ref(""),
    };
    // 获取实例
    const instance = getCurrentInstance();
    const {
      ctx,
      ctx: {
        $router,
        $router: {
          currentRoute: {
            value: { query },
          },
        },
      },
    } = instance;
    // document.title = "求/出货上传";
    console.log("地址栏参数", query);
    provide("sourceType", 1);
    onMounted(() => {
      _.currUid.value = query.uid || "";
    });
    const changeType = (type) => {
      _.prokey.value = "";
      _.sizes.value = "";
      _.dataSource = [];
      _.stype.value = type;
    };
    const deleteShip = (key) => {
      const dataSource = [..._.dataSource];
      _.dataSource = dataSource.filter((item, index) => index !== key);
    };
    const inportShip = async () => {
      const {
        sizes: { value: sizes },
        prokey: { value: prokey },
        stype: { value: stype },
      } = _;
      if (prokey == "") {
        Toast("请输入货号");
        return;
      }
      if (sizes == "") {
        Toast("请输入尺码");
        return;
      }
      const resData = await checkShipment({
        type: stype,
        list: [{ sku: prokey, sizes }],
      });
      const { errorlist = [], modelist = [] } = resData;
      const isSku = errorlist.find((item) => item.skucode == -1);
      const isSize = errorlist.find((item) => item.sizescode == -1);
      if (isSku) {
        Toast("请输入正确的货号");
        return;
      }
      if (isSize) {
        Toast("请输入正确的尺码");
        return;
      }
      const dataSource = _.dataSource;
      console.log(dataSource, modelist);
      if (modelist && modelist.length > 0) {
        _.dataSource = [...new Set([...dataSource, ...modelist])];
        _.prokey.value = "";
        _.sizes.value = "";
      }
    };

    const submitShip = () => {
      let temPara = JSON.parse(JSON.stringify(_.dataSource));
      if (temPara.length == 0) {
        Toast("请添加商品");

        return;
      }
      _.disabledLoading.value = true;
      temPara.forEach((item) => {
        delete item.name;
        delete item.picurl;
      });

      addShipment({ type: this.stype, list: temPara, uid: this.currUid })
        .then((data) => {
          data && Toast("提交成功,可在「嗜鞋APP-我的-商品买卖」中查看");
          _.disabledLoading.value = false;
          _.dataSource = [];
        })
        .catch((err) => {
          _.disabledLoading.value = false;
          Toast(err.msg);
        });
    };
    return {
      ..._,
      changeType,
      deleteShip,
      inportShip,
      submitShip,
    };
  },
};
</script>

<style lang="scss" scoped>
.shipment-box {
  .shipment-item {
    @include flex(flex, flex-start, center, nowrap);
    margin-top: 24px;
    font-size: 15px;
    &.top_table {
      align-items: flex-start;
    }
    .left-cont {
      width: 100px;
      flex-shrink: 0;
      text-align: right;
      margin-right: 10px;
    }
    .right-cont {
      width: 100%;
      flex-shrink: 1;
      @include flex(flex, flex-start, center, nowrap);
      &.style_ship {
        span {
          display: inline-block;
          height: 35px;
          border-radius: 4px;
          padding: 0 20px;
          line-height: 35px;
          border: 1px solid transparent;
          color: rgba(0, 0, 0, 0.65);
          background-color: #fff;
          border-color: #d9d9d9;
          margin-right: 10px;
          cursor: pointer;
          &.choosen {
            color: #fff;
            background-color: #1890ff;
            border-color: #1890ff;
          }
        }
      }
      &.product_ship {
        @include flex(column, flex-start, flex-start, nowrap);
        input {
          min-width: 150px;
          height: 35px;
          line-height: 35px;
          margin-right: 20px;
          color: rgba(0, 0, 0, 0.85);
          font-weight: 600;
          border: 1px solid #d9d9d9;
          font-size: 14px;
          border-radius: 4px;
          padding: 4px 11px;
          margin-bottom: 15px;
          &.size-inpt {
            max-width: 336px;
            width: 86%;
          }
        }
      }
      .base_butn {
        height: 35px;
        line-height: 35px;
        padding: 0 15px;
        border-radius: 4px;
        color: #fff;
        font-size: 15px;
        background-color: #1890ff;
        border-color: #1890ff;
      }
      .order_table {
        display: block;
        border-collapse: separate;
        border-spacing: 0px;
        thead {
          tr {
            th {
              background-color: #f5f5f5;
              color: rgba(0, 0, 0, 0.85);
              font-weight: 500;
              text-align: center;
              height: 35px;
              line-height: 35px;
              background: #fafafa;
              padding: 5px 0;
              border-bottom: 1px solid #e8e8e8;
            }
          }
        }
      }
      .prod_img {
        display: block;
        margin: 0 auto;
        width: 50px;
        height: 50px;
      }
      .delt_span {
        color: #1890ff;
      }
    }
  }
}
</style>
