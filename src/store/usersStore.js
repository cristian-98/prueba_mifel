import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lstUsers: [],
    userSelected: {},
  },
  mutations: {
    SET_LSTUSERS(state, userData) {
      state.lstUsers = userData;
    },
    SET_USERSELECTED(state, user) {
      state.userSelected = user;
    },
    SET_USERTOLSTUSERS(state, user) {
      state.lstUsers.push(user);
    },
  },
  actions: {
    setLstUsers({ commit }, userData) {
      commit("SET_LSTUSERS", userData);
    },
    setUserSelected({ commit }, user) {
      commit("SET_USERSELECTED", user);
    },
  },
  getters: {
    getUser: (state) => state.lstUsers,
    getUserSelected: (state) => state.userSelected,
  },
});
