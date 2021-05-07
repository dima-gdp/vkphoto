import toastr from 'toastr/build/toastr.min'

export default {
  install(Vue, options) {
    Vue.prototype.$message = function (text) {
      toastr.warning(text)
    }

    Vue.prototype.$error = function (text) {
      toastr.error(text)
    }
  }
}
