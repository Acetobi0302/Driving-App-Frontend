import Vue from 'vue'

/**
 * You can register global directives here and use them as a plugin in your main Vue instance
 */
Vue.directive(
  'click-outside',
  Vue.directive('click-outside', {
    bind(el, binding, vnode) {
      el.clickOutsideEvent = function (event) {
        // here I check that click was outside the el and his childrens
        // eslint-disable-next-line eqeqeq
        if (!(el == event.target || el.contains(event.target))) {
          // and if it did, call method provided in attribute value
          vnode.context[binding.expression](event)
        }
      }
      document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unbind(el) {
      document.body.removeEventListener('click', el.clickOutsideEvent)
    },
  })
)
