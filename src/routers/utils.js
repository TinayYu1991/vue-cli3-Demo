/**
 * 简化router文件
 * @param  {[String]} path          定义路由路径
 * @param  {[String]} name          页面命名
 * @param  {[String]} mete         页面meta
 * @param  {Object} [other={}]    路由其他参数
 * @param  {Array}  [children=[]] 嵌套路由配置
 * @return {Object}               返回router可用obj
 */
export default function path({
  path, name,  meta, other, children
} = {
  path: '',
  name: '',
  meta: {},
  other: {},
  children: []
}) {
  return Object.assign({
    path,
    name,
    meta,
    component: () => import(/* webpackChunkName: "chunk-app" */ `../views/${name}/index.vue`),
    children
  }, other)
}
