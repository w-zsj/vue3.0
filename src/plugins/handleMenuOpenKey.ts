import { reactive, toRefs, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import router from "../router";
import { MenuRouter, Breadcrumb } from '@/interface'
interface openKeys {
    defaultOpeneds: string[]
    defaultActive: string
}
export default () => {
    let openKeys: openKeys = reactive({
        defaultOpeneds: [],
        defaultActive: ''
    })

    // 路由跳转时 更新菜单
    const route = useRoute()
    watch(() => route.path, (path) => {
        // console.log('监听到变化', path)
        openKeys.defaultActive = path;
        getOpeneds(_router);
    })

    const store = useStore();
    openKeys.defaultActive = router.currentRoute.value.path;
    // 页面刷新 展开默认菜单
    const _router: MenuRouter<string>[] = store.getters['base/staticRoutes']
    getOpeneds(_router);

    function getOpeneds(router: MenuRouter<string>[], parent: string[] = [], Breadcrumb: Array<Breadcrumb> = []) {
        router.forEach((item) => {
            if (item.path == openKeys.defaultActive) {
                let crumb = [...Breadcrumb, { title: item.meta.title, path: item.path }]
                if (item.hidden) openKeys.defaultActive = parent[parent.length - 1];
                openKeys.defaultOpeneds = [...parent, item.path];
                // 处理面包屑
                crumb = crumb.filter(i => i.title)
                store.dispatch({ type: 'base/BreadCrumbData', crumb })
                console.log(`defaultOpeneds--->>`, openKeys.defaultActive, openKeys.defaultOpeneds);
            } else if (item?.children?.length && item?.path) {
                getOpeneds(item.children,
                    [...parent, item.path],
                    [...Breadcrumb, { title: item.meta.title, path: item.path }]
                );
            }
        });
    }

    return toRefs(openKeys)
}