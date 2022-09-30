import Layout from '@/layout'
export default
{
  path: '/departments',
  name: 'departments',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/departments/index.vue'),
      meta: { title: '考勤11', icon: 'tree' }
    }
  ]
}
