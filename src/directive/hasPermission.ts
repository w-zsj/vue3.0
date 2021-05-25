
export default {
    mounted(el: any, binding: any) {
        const { value } = binding
        const all_permission = "*:*:*";
        let permissions: any = localStorage.getItem('permissions')
        permissions = permissions.split(',')
        console.log(`permissions`, value, permissions)
        if (value && value instanceof Array && value.length > 0 && permissions) {
            const permissionFlag = value
            const hasPermissions = permissions.some((permission: any) => {
                return all_permission === permission || permissionFlag.includes(permission)
            })
            if (!hasPermissions) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        } else {
            throw new Error(`请设置操作权限标签值`)
        }
    }
}
