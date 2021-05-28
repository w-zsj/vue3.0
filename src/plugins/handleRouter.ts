import { computed } from "vue";
import { useStore } from "vuex";
import { MenuRouter } from '@/interface'
export default () => {
    const store = useStore();
    const addRoutes = computed(() => {
        let router = store.getters['base/addRoutes']
        function delHiddenRouter(r: Array<MenuRouter<string>>) {
            let newRouter: Array<MenuRouter<string>> = [];
            if (r?.length)
                r.forEach((item: MenuRouter<string>) => {
                    if (!item.hidden) {
                        const newItem = { ...item };
                        delete newItem.children;
                        if (
                            item.children &&
                            !item.children.every((item: MenuRouter<string>) => item.hidden)
                        ) {
                            let childrenArr = delHiddenRouter(item.children);
                            if (childrenArr?.length > 0) {
                                newItem.children = childrenArr;
                            }
                        } else delHiddenRouter(item.children);
                        newRouter.push(newItem);
                    }
                });
            // console.log(`newRouter-->>`, newRouter);
            router = newRouter;
            return newRouter;
        }
        delHiddenRouter(router);
        return router;
    });
    return addRoutes
}