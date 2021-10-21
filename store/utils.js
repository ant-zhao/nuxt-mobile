/*
 * @Description: 
 * @Author: zhaojunjie
 * @Date: 2020-11-29 13:46:50
 * @LastEditTime: 2021-04-15 12:10:11
 * @LastEditors: zhaojunjie
 */


export const state = () => ({
    loading: false,
    scrollTop: 0,
    windowHeight: 0,
    windowScrollHeight: 0,
    isMobile: true,
    system: 'other',  // 操作系统
    iscutQuery: false,
    previewVisible: false,
    previewIndex: 0,
    previewList: [],
    theme: 'light',
});

export const mutations = {
    changeState(state,{key,value}) {
        state[key] = value;
        return state;
    }
};