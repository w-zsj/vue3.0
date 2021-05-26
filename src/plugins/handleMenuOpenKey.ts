import { computed, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import router from "../router";
export default () => {
    let defaultOpeneds: any[] = reactive([]);
    let defaultActive = ref("");
    // 路由跳转时 更新菜单
    const route = useRoute()
    watch(() => route.path, (path, prepath) => {
        // console.log('监听到变化', path, prepath)
        defaultActive.value = path;
        getOpeneds(_router);
    })
    const store = useStore();
    defaultActive.value = router.currentRoute.value.path;
    // 页面刷新 展开默认菜单
    const _router: any = store.getters['base/staticRoutes']
    getOpeneds(_router);

    function getOpeneds(router: any[], parent: any = [], Breadcrumb: any = []) {
        router.forEach((item) => {
            if (item.path == defaultActive.value) {
                let crumb = [...Breadcrumb, { title: item.meta.title, path: item.path }]
                if (item.hidden) defaultActive.value = parent[parent.length - 1];
                defaultOpeneds = [...parent, item.path];
                // 处理面包屑
                store.dispatch({ type: 'base/BreadCrumbData', crumb })
                console.log(`defaultOpeneds--->>`, defaultActive.value, defaultOpeneds);
                // console.log(`Breadcrumb`, crumb)
            } else if (item?.children?.length && item?.path) {
                getOpeneds(item.children,
                    [...parent, item.path],
                    [...Breadcrumb, { title: item.meta.title, path: item.path }]
                );
            }
        });
    }

    return { defaultActive, defaultOpeneds, }
}