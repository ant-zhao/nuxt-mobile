import Vue from 'vue';
import Vuex from 'vuex';
import userBasic from './modules/userBasic';

Vue.use(Vuex);
let store = () => {
  return new Vuex.Store({
    modules: {
      userBasic
    },
    strict: true
  });
};
export default store;
