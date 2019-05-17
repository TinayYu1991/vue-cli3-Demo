export default [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "chunk-app" */ '../views/Home.vue')
  }
]