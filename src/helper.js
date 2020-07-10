import Vue from 'vue'

const storage = window.localStorage
let helper = {}

/**
 * localStorage
 */
helper.ls = {
  set (key, value) {
    value = JSON.stringify(value)
    storage.setItem(key, value)
  },
  get (key, defaultValue) {
    let value = storage.getItem(key)
    if (value === null || value === 'undefined' || value === '') {
      value = defaultValue
    } else {
      value = JSON.parse(value)
    }
    return value
  }
}
/**
 * a wrapper for helper.ls
 */
helper.store = (key, value) => {
  //if (arguments.length < 2) {
    if (  !value || value == null || typeof(value) == undefined ) {
    return helper.ls.get(key)
  } else {
    return helper.ls.set(key, value)
  }
}
Vue.directive('back', (el, binding) => {
  el.onclick = () => window.history.go(-1)
})

export default helper
