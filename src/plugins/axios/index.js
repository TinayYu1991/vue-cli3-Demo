import Vue from 'vue'
import axios from 'axios'
import authIntercept from '../../api/intercept'

const _axios = axios.create({
  // 设置超时时间
  timeout: 10000,
  baseURL: process.env.BASE_URL
})

const plugin = Vue => {
  Vue.mixin({
    created() {
      this.$axios = {
        ..._axios,
        auth: authIntercept
      }
    }
  })
}

Vue.use(plugin)
