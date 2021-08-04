import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  name: 'Charts',
  meta: {
    title: '图表',
    icon: 'icon-tubiao'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/charts/keyboard'),
      name: 'KeyboardChart',
      meta: {
        title: 'Keyboard Chart',
        noCache: true
      }
    },
    {
      path: 'line',
      component: () => import('@/views/charts/line'),
      name: 'LineChart',
      meta: {
        title: 'Line Chart',
        noCache: true
      }
    },
    {
      path: 'mix-chart',
      component: () => import('@/views/charts/mix-chart'),
      name: 'MixChart',
      meta: {
        title: 'Mix Chart',
        noCache: true
      }
    }
  ]
}

export default chartsRouter