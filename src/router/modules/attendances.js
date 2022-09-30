import Layout from '@/layout'
export default
{
  path: '/attendances',
  name: 'attendances ',
  component: Layout,
  children: [
    {
      path: 'attendances',
      component: () => import('@/views/attendances/index.vue'),
      meta: { title: '组织架构', icon: 'skill' }
    }
  ]
}
