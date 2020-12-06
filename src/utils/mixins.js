
import CallApp from '@/utils/callapp'
import dealParams from './dealAppParams'
import { WxShare } from './apis/wechat'

var shareInterval

/**
 * 全局混入
 */
const Mixin = {
    methods: {
        toast(){
            console.log('toast----')
        },
        /**
         * 
         * @param {*} iscall //
         * @param {*} hint // 蒙层
         * @param {*} customParams  // 自定义参数
         */
        callApp(iscall, hint = true, customParams = {}) {
            let { params, name, query } = this.$route
            let payload = this.$root.callPayload || {}
            customParams = { ...params, ...query, name, ...customParams, }
            let callparam = dealParams(customParams)
            console.log('mixin callApp: ', payload, callparam)
            CallApp(!iscall, callparam, hint, document.getElementById('goAppHint'))
        },
        /**
         * 设置微信分享
         * @param {Object} option
         * @param {String} option.title 分享标题
         * @param {String} option.content 分享描述
         * @param {String} option.icon 分享图标/图片
         * @param {String} option.url 分享的地址
        //  * @param {String} option.typename 分享类型 music video link  默认link
         */
        setShare({ title, content: desc, icon: imgUrl, url }) {
            let info = { title, desc, imgUrl, link: url || window.location.href }
            console.log(' set share info: ', info)
            if (ENV.wx) {
                if (shareInterval) clearTimeout(shareInterval)
                shareInterval = setTimeout(() => {
                    if (!info.title) info.title = document.title
                    if (!info.desc) info.desc = 'ddd'
                    if (!info.imgUrl) {
                        info.imgUrl = ''
                    }

                    WxShare(info)
                }, 200)
            }
        }

    }
}

export default Mixin

