import { Swipe, SwipeItem, Button,List } from 'vant';
const components = [
    Swipe, SwipeItem,
    Button,List
]
const setupVant = (app: any) => {
    components.forEach(component => {
        // app.component(component.name, component)
        app.use(component)
    })
}
export default setupVant