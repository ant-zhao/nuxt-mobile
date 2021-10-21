/*
 * @Description: 
 * @Author: zhaojunjie
 * @Date: 2021-10-20 23:29:54
 * @LastEditTime: 2021-10-20 23:37:13
 * @LastEditors: zhaojunjie
 */
import request from "./request";
import url from '@/server/global';
const { baseUrl } = url;

// 更新用户信息
export const updateUserApi = params =>{
    return request.post(`${baseUrl}/sentences/power/updateUser`, params);
}

// 句子随机配图
export const randomPicApi = params => {
    return request.get(`${ baseUrl }/sentences/browse/randomPic`, params)
}