const state = () => {
  return {
    userInfo: {
      name: '',
      tel: ''
    }
  };
};

const getters = {};

const mutation = {
  SET_USERINFO(state, info) {
    state.userInfo = info;
    return state;
  },
  CLEAR_USERINFO(state) {
    state.userInfo = {
      name: '',
      tel: ''
    };
  }
};

const actions = {
  //异步方法调用
};

export default {
  state,
  mutation,
  actions
};
