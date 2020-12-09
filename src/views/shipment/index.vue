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
            <div class="_btn">
              <button
                class="base_butn"
                style="margin: 0 0 0 0"
                @click="inportShip"
              >
                添加
              </button>
              <span class="updeta" @click="moreUpdeta">表格批量上传</span>
            </div>
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

    <!-- 弹框 -->
    <van-popup
      v-model:show="UpdetaModal"
      transition="popup-fade"
      :style="{ padding: '30px', width: '70% ' }"
      :round="true"
    >
      <div class="updeta_modal">
        <div class="tit">请按以下格式填写表格</div>
        <div class="temp">
          <img src="../../assets/img/form_temp.png" alt="" />
        </div>
        <div class="up-btn">
          <button type="light" shape="circle" class="canl" @click="closeModal">
            取消
          </button>
          <van-uploader :after-read="afterRead" accept="file">
            <van-button icon="plus" type="">选择文件</van-button>
          </van-uploader>
          <!-- <button @click="confirm">选择文件</button> -->
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { checkShipment, addShipment, uploadProduct } from "api/shipment.js";
import NoContent from "comps/NoContent";
import {
  reactive,
  ref,
  getCurrentInstance,
  onMounted,
  provide,
  triggerRef,
  toRaw,
} from "vue";
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
      dataSource: ref([]),
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
      UpdetaModal: ref(false),
    };

    console.log(_.dataSource.value, "dataSource");
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
      _.dataSource.value = [];
      _.stype.value = type;
    };
    const deleteShip = (key) => {
      const dataSource = [..._.dataSource.value];
      _.dataSource.value = dataSource.filter((item, index) => index !== key);
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
      console.log(_.dataSource.value, modelist);
      if (modelist && modelist.length > 0) {
        _.dataSource.value = [...new Set([..._.dataSource.value, ...modelist])];
        _.prokey.value = "";
        _.sizes.value = "";
      }
    };

    const submitShip = () => {
      let temPara = JSON.parse(JSON.stringify(_.dataSource.value));
      if (temPara.length == 0) {
        Toast("请添加商品");

        return;
      }
      _.disabledLoading.value = true;
      temPara.forEach((item) => {
        delete item.name;
        delete item.picurl;
      });

      addShipment({ type: _.stype.value, list: temPara, uid: _.currUid.value })
        .then((data) => {
          data && Toast("提交成功,可在「嗜鞋APP-我的-商品买卖」中查看");
          _.disabledLoading.value = false;
          _.dataSource.value = [];
        })
        .catch((err) => {
          _.disabledLoading.value = false;
          Toast(err.msg);
        });
    };
    const moreUpdeta = () => {
      _.UpdetaModal.value = true;
    };
    const closeModal = () => {
      _.UpdetaModal.value = false;
    };
    const afterRead = (data) => {
      const formData = new FormData();
      formData.append("file", data.file);
      uploadProduct(formData)
        .then((res) => {
          if (res && res.modelist && res.modelist.length) {
            _.dataSource.value = [..._.dataSource.value, ...res.modelist];
            console.log("res--", _.dataSource);
          }
          closeModal();
        })
        .catch((err) => Toast(err));
    };
    return {
      ..._,
      changeType,
      deleteShip,
      inportShip,
      submitShip,
      moreUpdeta,
      afterRead,
      closeModal,
    };
  },
};
</script>
<style>
.van-uploader__upload {
  flex: 1 !important;
  height: 35px !important ;
}
.van-uploader__upload-icon {
  display: none;
}
</style>
<style lang="scss" scoped>
.updeta_modal {
  .tit {
    @include flex(flex, center, center, nowrap);
    font-size: 18px;
    font-weight: bold;
  }
  img {
    margin: 30px auto;
    width: 100%;
    height: auto;
  }

  .up-btn {
    font-size: 18px;
    @include flex(flex, center, flex-start, nowrap);
    button {
      width: 112px;
      height: 35px;
      background: #1890ff;
      color: #fff;
      font-size: 15px;
      border-radius: 8px;
      @include flex(flex, center, center, nowrap);
      &.canl {
        background: none;
        border: 1px solid #969696;
        color: #232323;
        margin-right: 20px;
      }
    }
  }
}
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
        ._btn {
          @include flex(flex, start, center);
          .updeta {
            color: #1890ff;
            font-size: 14px;
            padding-left: 10px;
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
