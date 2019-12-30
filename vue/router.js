let Vue;

class VueRouter {
  constructor(options) {
    this.$options = options
    this.routeMap = {}
    this.app = new Vue({
      data:{
        current:"/"
      }
    })
  }

  init(){
    
  }
}

VueRouter.install = function(_Vue) {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
        this.$options.router.init()
      }
    }
  });
}

export default VueRouter;
