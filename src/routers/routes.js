import AsyncComponent from './utils';

// 路由配置
export const Routes = [
    {
        path: '/',
        exact: true,
        component: AsyncComponent({
            loader: () => import('../pages/homePage/index')
        })
    },
    {
        path: '/about',
        component: AsyncComponent({
            loader: () => import('../pages/aboutPage/index')
        })
    },
    {
        path: '/topics',
        component: AsyncComponent({
            loader: () => import('../pages/topicsPage/index')
        }),
        routes: [
            {
                path: '/topics/:topicId',
                component: AsyncComponent({
                    loader: () => import('../components/Topic/index')
                })
            }
        ]
    }
];
