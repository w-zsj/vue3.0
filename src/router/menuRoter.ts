let rouetr: Array<any> = [
  {
    path: "/",
    name: "Home",
    redirect: "/home",
    component: "BasicLayout",
    meta: {
      title: "首页",
      icon: "home",
      actIcon: "acthome",
    },
    childlist: [
      {
        path: "/home",
        name: "index",
        redirect: "/home/stree",
        component: "BlankLayout",
        meta: {
          title: "二级",
          icon: "home",
          actIcon: "acthome",
        },
        childlist: [
          {
            path: "/home/stree",
            name: "stree",
            component: "login",
            meta: {
              title: "三级",
              icon: "home",
              actIcon: "acthome",
            },
          },
          {
            path: "/home/four",
            name: "four",
            redirect: "/home/four/list",
            component: "BlankLayout",
            meta: {
              title: "库存列表",
              icon: "home",
              actIcon: "acthome",
            },
            childlist: [
              {
                path: "/home/four/list",
                name: "homeList",
                component: "home",
                meta: {
                  title: "",
                },
                hidden: true,
              },
              {
                path: "/demo",
                name: "demo",
                component: "demo",
                meta: {
                  title: "库存详情",
                },
                hidden: true,
              },
              {
                permission: "warehouse:store:list:detail",
              },
            ],
          },
        ],
      },
      {
        path: "/home/list",
        name: "test12",
        component: "login",
        meta: {
          title: "订单",
        },
        hidden: false,
      },
    ],
  },
  {
    path: "/order",
    redirect: "/order/list",
    name: "Order",
    component: "BasicLayout",
    meta: {
      title: "订单",
      icon: "order",
      actIcon: "actorder",
    },
    childlist: [
      {
        path: "/order/list",
        name: "test",
        component: "a",
        meta: {
          title: "列表",
        },
        hidden: true,
      },
    ],
  },
];
export default rouetr;
