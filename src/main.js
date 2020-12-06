
import { createApp, h } from 'vue';
import App from './App.vue'

import router from "./router"
import store from "./store"

const app = createApp({
    data() {
        return {}
    },
    render: () => h(App)
})
app.use(router)
    .use(store)
    .mount('#app')

export default app
