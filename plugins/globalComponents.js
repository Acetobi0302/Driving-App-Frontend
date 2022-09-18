import Vue from 'vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { Input, Tooltip, Popover } from 'element-ui'
import DatePicker from 'vue2-datepicker'
import BaseInput from '@/components/argon-core/Inputs/BaseInput.vue'
import BaseDropdown from '@/components/argon-core/BaseDropdown.vue'
import Card from '@/components/argon-core/Cards/Card.vue'
import StatsCard from '@/components/argon-core/Cards/StatsCard.vue'
import BaseNav from '@/components/argon-core/Navbar/BaseNav'
import BaseHeader from '@/components/argon-core/BaseHeader'
import 'vue2-datepicker/index.css'
import 'vue-search-select/dist/VueSearchSelect.css'
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */
import 'vue2-datepicker/locale/de'
Vue.component(BaseHeader.name, BaseHeader)
Vue.component(BaseInput.name, BaseInput)
Vue.component(BaseDropdown.name, BaseDropdown)
Vue.component(BaseNav.name, BaseNav)
Vue.component(Card.name, Card)
Vue.component(StatsCard.name, StatsCard)
Vue.component(Input.name, Input)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.use(Tooltip)
Vue.use(Popover)
Vue.use(DatePicker)
