const RecordsAdd = () => import('../views/RecordsAdd.vue')
const RecordsHome = () => import('../views/RecordsHome.vue')
export default [
  {
    path: 'records',
    component: RecordsHome,
    meta: {
      requiresAtuth: true
    },
    alias: ['home', '']
  },
  {
    path: 'records/add',
    component: RecordsAdd,
    meta: {
      requiresAtuth: true
    }
  }

]
