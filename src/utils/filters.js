
import { DateDiffFormat } from "@/utils/util";
const filters = {
    NumFormat(val) {
        return val < 0 ? 0 : parseFloat(val).toFixed(2);
    },
    floatPercent: function (val) {
        return val < 0 ? 0 : parseFloat((val * 100)).toFixed(2);
    },
    techRateFormat: function (val) {
        return val < 0 ? 0 : parseFloat((val * 100)).toFixed(2);
    },
    formateSize: function (val) {
        let temSize = "";
        if (val && val.length > 0) {
            val.forEach((item) => {
                temSize += item.size + ",";
            });
            temSize = temSize.substring(0, temSize.lastIndexOf(","));
            return temSize;
        } else {
            return "";
        }
    },
    formatDate: function (val) {
        DateDiffFormat(val, { d: 3, dShow: "yyyy-MM-dd" })
    }
}
export default filters