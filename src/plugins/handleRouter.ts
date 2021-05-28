import { computed } from "vue";
import { useStore } from "vuex";
import { MenuRouter } from '@/interface'
export default () => {
    const store = useStore();
    const addRoutes = computed(() => {
        let router = store.getters['base/addRoutes']
        function delHiddenRouter<T>(r: Array<T>) {
            let newRouter: Array<T> = [];
            if (r?.length)
                r.forEach((item: any) => {
                    if (!item.hidden) {
                        let newItem = { ...item };
                        delete newItem.children;
                        if (
                            item.children &&
                            !item.children.every((item: any) => item.hidden)
                        ) {
                            let childrenArr = delHiddenRouter<T>(item.children);
                            if (childrenArr?.length > 0) newItem.children = childrenArr;
                        } else delHiddenRouter<T>(item.children);
                        newRouter.push(newItem);
                    }
                });
            // console.log(`newRouter-->>`, newRouter);
            router = newRouter;
            return newRouter;
        }
        delHiddenRouter<MenuRouter<string>>(router);
        return router;
    });
    return addRoutes
}