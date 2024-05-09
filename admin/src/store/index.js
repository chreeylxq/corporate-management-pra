import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    isGetterRouter: false,
    isCollapse: false,
    userInfo: {}
  },
  getters: {
  },
  mutations: {
    changeGetterRouter(state, value) {
      state.isGetterRouter = value;
    },
    changeCollapseState(state) {
      this.state.isCollapse = !this.state.isCollapse;
    },
    changeUserInfo(state, value) {
      console.log('state')
      console.log(state.userInfo);
      console.log(value)
      state.userInfo = {
        ...state.userInfo, ...value
      }

      console.log(state.userInfo)
    },
    clearUserInfo(state) {
      state.userInfo = {};
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths: ['isCollapse', 'userInfo'] //控制需要持久化的state
  })]
})
