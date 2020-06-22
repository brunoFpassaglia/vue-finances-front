const RecordsHome = () => import('../views/RecordsHome.vue')
export default [
  {
    path: 'records',
    component: RecordsHome,
    meta: {
      requiresAtuth: true
    },
    alias: ['home', '']
  }
]
