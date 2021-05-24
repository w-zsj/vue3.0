// 如果要使用.scss样式文件，则需要引入base.scss文件
// import 'element-plus/packages/theme-chalk/src/base.scss'

import {
    ElAside,
    ElBreadcrumb,
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
    ElMenuItemGroup,
    ElOption,
    ElOptionGroup,
    ElPageHeader,
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
    ElMenuItemGroup,
    ElOption,
    ElOptionGroup,
    ElPageHeader,
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


const cops = (app: any) => {
    components.forEach(component => {
        app.component(component.name, component)
    })
}
export default cops
