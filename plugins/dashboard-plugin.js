import Vue from 'vue'
// Validation plugin used to validate forms
// A plugin file where you could register global components used across the app
// A plugin file where you could register global directives
// Sidebar on the right. Used as a local plugin in DashboardLayout.vue

// element ui language configuration
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

// vue-bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// asset imports
// asset imports
import '@/assets/scss/argon.scss';
import { configure, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/en.json'
import SideBar from '@/components/argon-core/SidebarPlugin'
// Notifications plugin. Used on Notifications page
locale.use(lang)

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    // eslint-disable-next-line import/namespace
    ...rules[rule], // copies rule configuration
    message: messages[rule], // assign message
  })
})

Vue.use(SideBar)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
    dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
  },
})
