import Vue from 'vue'
import Icon from '@/components/Icon.vue'

const req = require.context('./svg',false,/\.svg$/)
req.keys().map(req)

// 全局注册icon组件
Vue.component('Icon',Icon)