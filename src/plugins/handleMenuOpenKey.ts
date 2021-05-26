import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import router from "../router";
export default () => {
    let defaultOpeneds: any[] = reactive([]);
    let defaultActive = ref("");

    const store = useStore();
    defaultActive.value = router.currentRoute.value.path;
    // 页面刷新 展开默认菜单
    const _router: any = computed(() => store.state.base.staticRoutes);
    getOpeneds(_router.value, []);

    const select = (key: any) => {
        defaultActive.value = key;
        console.log(`object`, defaultActive.value, defaultOpeneds);
        getOpeneds(_router.value, []);
    };

    function getOpeneds(router: any[], parent: string[]) {
        router.forEach((item) => {
            if (item.path == defaultActive.value) {
                if (item.hidden) defaultActive.value = parent[parent.length - 1];
                defaultOpeneds = [...parent, item.path];
            } else if (item?.children?.length && item?.path) {
                getOpeneds(item.children, [...parent, item.path]);
            }
        });
    }

    return { defaultActive, defaultOpeneds, select, }
}