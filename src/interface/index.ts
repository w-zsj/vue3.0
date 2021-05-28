export interface MenuRouter<T> {
    path: T
    name: T
    redirect: T
    component: T
    meta: any
    childlist: Array<any>
    hidden?: boolean
    type: number
    [propName: string]: any
}

export interface Breadcrumb {
    path: string,
    title: string
}