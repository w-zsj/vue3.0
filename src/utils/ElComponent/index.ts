// 如果要使用.scss样式文件，则需要引入base.scss文件
// import 'element-plus/packages/theme-chalk/src/base.scss'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale'

import {
    ElAside,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElButton,
    ElContainer,
    ElDatePicker,
    ElForm,
    ElFormItem,
    ElHeader,
    ElInput,
    ElMain,
    ElMenu,
    ElMenuItem,
    ElOption,
    ElOptionGroup,
    ElPagination,
    ElRow,
    ElSelect,
    ElSlider,
    ElSubmenu,
    ElTable,
    ElTableColumn,
    ElTabs,
    ElTooltip,
    ElTree,
    ElUpload,
    ElScrollbar,
    ElIcon,
} from 'element-plus';

const components = [
    ElAside,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElButton,
    ElContainer,
    ElDatePicker,
    ElForm,
    ElFormItem,
    ElHeader,
    ElInput,
    ElMain,
    ElMenu,
    ElMenuItem,
    ElOption,
    ElOptionGroup,
    ElPagination,
    ElRow,
    ElSelect,
    ElSlider,
    ElSubmenu,
    ElTable,
    ElTableColumn,
    ElTabs,
    ElTooltip,
    ElTree,
    ElUpload,
    ElScrollbar,
    ElIcon,
]


const setupElComponent = (app: any) => {
    locale.use(lang)
    components.forEach(component => {
        app.component(component.name, component)
    })
}
export default setupElComponent
