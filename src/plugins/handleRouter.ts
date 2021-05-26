import { toRefs, computed } from "vue";
import { useStore } from "vuex";
export default () => {
    const store = useStore();
    const addRoutes: any = computed(() => {
        let router = store.getters['base/addRoutes']
        function delHiddenRouter(r: any[]) {
            let newRouter: any = [];
            if (r?.length)
                r.forEach((item: any) => {
                    if (!item.hidden) {
                        const newItem = { ...item };
                        delete newItem.children;
                        if (
                            item.children &&
                            !item.children.every((item: any) => item.hidden)
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