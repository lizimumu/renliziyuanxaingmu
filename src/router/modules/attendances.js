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
      meta: { title: '考勤', icon: 'skill' }
    }
  ]
}
