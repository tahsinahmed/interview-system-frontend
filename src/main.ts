import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";
import VueRouter from 'vue-router'
import ShowInterview from "@/components/Interview/ShowInterview.vue";
import CreateInterview from '@/components/Interview/CreateInterview.vue'
import SubmitResult from '@/components/Interview/SubmitResult.vue'
import CreateInterviewee from '@/components/interviewee/CreateInterviewee.vue'
import CreateInterviewer from '@/components/interviewer/CreateInterviewer.vue'
import ShowInterviewer from '@/components/interviewer/ShowInterviewer.vue'
import ShowInterviewee from '@/components/interviewee/ShowInterviewee.vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)

const routes = [
  { path: '/', component: ShowInterview },
  { path: '/create-interview', component: CreateInterview },
  { path: '/create-interviewee', component: CreateInterviewee },
  { path: '/create-interviewer', component: CreateInterviewer },
  { path: '/show-interviewee', component: ShowInterviewee },
  { path: '/show-interviewer', component: ShowInterviewer },
  { path: '/update-interview/:id', component: SubmitResult },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
