import Vue from 'vue'
import Vuex from 'vuex'
import TreeView from '@/store/modules/TreeView'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    treeview: TreeView
  }
})

export default store
