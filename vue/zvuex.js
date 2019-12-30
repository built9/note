let Vue;

function install(_Vue, storeName = "$store") {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype[storeName] = this.$options.store;
      }
    }
  });
}

class Store {
  constructor(options = {}) {
    this.state = new Vue({
      data: options.state
    });

    this.mutations = options.mutations || {};
    this.actions = options.actions || {};

    options.getters && this.handleGetters();
  }

  commit = (type, arg) => {
    const fn = this.mutations[type];
    fn(this.state, arg);
  };

  dispatch = (type, arg) => {
    const fn = this.actions[type];
    return fn({ commit: this.commit, state: this.state }, arg);
  };

  handleGetters(getters) {
    this.getters = {};
    Object.keys(getters).forEach(key => {
      Object.defineProperties(this.getters, key, {
        get: () => {
          return getters[key](this.state);
        }
      });
    });
  }
}

export default { Store, install };
