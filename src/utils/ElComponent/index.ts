// 如果要使用.scss样式文件，则需要引入base.scss文件
// import 'element-plus/packages/theme-chalk/src/base.scss'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale'

import {
    ElAside,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElContainer,
    ElHeader,
    ElButton,
    ElInput,
    ElMain,
    ElMenu,
    ElMenuItem,
    ElSubmenu,
    ElTable,
    ElTableColumn,
    ElScrollbar,
    ElIcon,
    ElCarousel
} from 'element-plus';

const components = [
    ElAside,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElContainer,
    ElHeader,
    ElMain,
    ElButton,
    ElInput,
    ElMenu,
    ElMenuItem,
    ElSubmenu,
    ElTable,
    ElTableColumn,
    ElScrollbar,
    ElIcon,
    ElCarousel
]


const setupElComponent = (app: any) => {
    locale.use(lang)
    components.forEach(component => {
        app.component(component.name, component)
    })
}
export default setupElComponent
