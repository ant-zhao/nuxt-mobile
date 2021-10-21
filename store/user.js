export const state = () => {
    return {
        userInfo: {
            name: "",
            userId: ""
        },
        showLogin: false
    };
};

export const getters = {};

export const mutations = {
    setUserInfo(state, info) {
        state.userInfo = info;
        return state;
    },
    turnLogin(state, flag) {
        state.showLogin = flag;
        return state;
    }
};

export const actions = {
  //异步方法调用
};
